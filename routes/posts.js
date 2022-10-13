const express = require("express")
const router = express.Router()
const auth = require("../middlewares/auth")

const {
    getAllPosts,
    getPost,
    deletePost,
    newPost,
    editPost
} = require("../controllers/posts")

router.route("/").get(getAllPosts).post(auth, newPost)
router.route("/:id").get(getPost).delete(auth, deletePost).patch(auth, editPost)

module.exports = router