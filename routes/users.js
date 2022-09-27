const express = require("express")
const router = express.Router()
const auth = require("../middlewares/auth")
const fileUpload = require("../utils/fileUpload")

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
router.route("/:id").get(getUser).patch(auth, fileUpload.array("uploadedImages", 2), editUser).delete(auth, removeUser)

module.exports = router