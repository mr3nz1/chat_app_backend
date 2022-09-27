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
router.route("/:id").get(getUser).patch(auth, fileUpload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "banner", maxCount: 1 }
]), editUser).delete(auth, removeUser)

module.exports = router