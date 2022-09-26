const express = require("express")
const router = express.Router()

const {
    login,
    register,
    getUser,
    editUser,
    removeUser,
    getAllUsers,
} = require("../controllers/users")

router.get("/", )