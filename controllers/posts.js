const uuid = require("uuid")
const { BadRequestError } = require("../errors")
const Post = require("../models/Post")

const getAllPosts = (req, res) => {
    res.send("get all posts")
}

const getPost = (req, res) => {
    res.send("get post")
}

const newPost = async (req, res) => {
    const {
        content,
    } = req.body

    const { userId } = req.user

    if (!content) throw new BadRequestError("Ensure that the submitted data is complete")    

    const tempPost = {
        id: uuid.v4(),
        userId,
        content
    }

    const post = await Post.build(tempPost)
    const validate = await user.validate()
    
    await user.save()

    res.status(StatusCodes.CREATED).json({
        msg: "success"
    })
}

const editPost = (req, res) => {
    res.send("edit post")
}

const deletePost = (req, res) => {
    res.send("delete post")
}


module.exports = {
    getAllPosts,
    getPost,
    deletePost,
    newPost,
    editPost
}