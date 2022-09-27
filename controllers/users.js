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
    if (!isPasswordCorrect) throw UnauthenticatedError("Password incorrect")

    const token = await user.createJWT()
    res.json({
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

    console.log(req.body)

    console.log(res.files)
}

const removeUser = async (req, res) => {
    res.send("removeUser route")
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