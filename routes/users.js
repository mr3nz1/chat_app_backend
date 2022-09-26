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

// auth
router.post("/login", login)
router.post("/register", register)

// other
router.get("/", getAllUsers)
router.route("/:id").get(getUser).patch(editUser).delete(removeUser)

module.exports = router