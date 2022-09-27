const User = require("../models/User")
const { BadRequestError } = require("../errors")
const uuid = require("uuid")
const { StatusCodes } = require("http-status-codes")

const login = async (req, res) => {
    res.send("login route")
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

    // res.status(StatusCodes.CREATED).json({
    //     userName: tempUser.userName,
    //     token
    // })
}

const getUser = async (req, res) => {
    res.send("getUser route")
}

const editUser = async (req, res) => {
    res.send("editUser route")
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