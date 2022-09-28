const User = require("../models/User")
const { BadRequestError, NotFoundError, UnauthenticatedError } = require("../errors")
const uuid = require("uuid")
const { StatusCodes } = require("http-status-codes")

const login = async (req, res) => {
    const {
        userNameOrEmail,
        password
    } = req.body

    if (!userNameOrEmail || !password) throw new BadRequestError("Ensure that all fields are filled")

    const isEmail = String(userNameOrEmail)
        .toLowerCase()
        .match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)

    let user

    if (isEmail) {
        user = await User.findOne({
            where: {
                email: userNameOrEmail
            }
        })
    }

    if (!isEmail) {
        user = await User.findOne({
            where: {
                userName: userNameOrEmail
            }
        })
    }

    if (!user) throw new NotFoundError("User not found")
    const isPasswordCorrect = await user.comparePasswords(password)
    if (!isPasswordCorrect) throw new UnauthenticatedError("Password incorrect")

    const token = await user.createJWT()
    res.status(StatusCodes.OK).json({
        msg: "success",
        token
    })
}

const register = async (req, res) => {
    const {
        userName,
        fullNames,
        email,
        password
    } = req.body

    if (!userName || !fullNames || !email || !password) throw new BadRequestError("Ensure that the submitted data is complete")

    const tempUser = {
        id: uuid.v4(),
        userName,
        fullNames,
        email,
        password
    }


    const user = await User.build(tempUser)
    const validate = await user.validate()
    const token = await user.createJWT()
    await user.save()

    res.status(StatusCodes.CREATED).json({
        msg: "success",
        token
    })
}

const getUser = async (req, res) => {
    res.send("getUser route")
}

const editUser = async (req, res) => {
    const {
        id: userId
    } = req.params

    const {
        userName,
        fullNames,
        email,
        password,
        description
    } = req.body

    let tempUser = {
        userName,
        fullNames,
        email,
        password,
        description,
        profileImage: req?.files?.avatar ? req?.files?.avatar[0]?.path : null,
        bannerImage: req?.files?.banner ? req?.files?.banner[0]?.path : null,
    }

    tempUser = Object.keys(tempUser)
        .filter((key) => tempUser[key] != null)
        .reduce((prevKeys, key) => ({ ...prevKeys, [key]: tempUser[key] }), {})

    const user = await User.findOne({
        where: {
            id: req.user.userId
        }
    })

    if (!user) throw new NotFoundError("User not found")
    
    await user.set(
        tempUser
    )

    const validate = await user.validate()
    await user.save(Object.keys(tempUser))

    res.status(StatusCodes.OK).json({
        msg: "success",
    })
}

const removeUser = async (req, res) => {
    const { userId } = req.user
    const user = await User.findOne({ 
        where: {
            id: userId
        } 
    })
    await user.destroy()

    res.status(StatusCodes.CREATED).json({
        msg: "success",
    })
}

const getAllUsers = async (req, res) => {
    res.send("getAllUsers route")
}

module.exports = {
    login,
    register,
    getUser,
    editUser,
    removeUser,
    getAllUsers,
}