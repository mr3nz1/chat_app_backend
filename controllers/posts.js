const uuid = require("uuid")
const { BadRequestError } = require("../errors")
const Post = require("../models/Post")
const User = require("../models/User")
const StatusCodes = require("http-status-codes")
const { NotFoundError } = require("../../../news_app/backend/errors")

const getAllPosts = async (req, res) => {    
    const posts = await Post.findAll({
        include: [
            {
                model: User,
                attributes: [
                    "userName",
                    "fullNames",
                    "bannerImage"
                ]
            }
        ]
    })
    
    if (!posts) throw new NotFoundError("problem occured when looking for posts")

    res.status(StatusCodes.CREATED).json({
        msg: "success",
        posts
    })
}

const getPost = async (req, res) => {
    const { id } = req.params

    const post = await Post.findOne({
        include: {
            model: User,
        },
        id
    })

    if (!post) throw new NotFoundError("problem occured when looking for post")

    res.status(StatusCodes.CREATED).json({
        msg: "success",
        post
    })
}

const newPost = async (req, res) => {
    const {
        content,
    } = req.body

    const { userId } = req.user

    if (!content || !userId) throw new BadRequestError("Ensure that the submitted data is complete")    


    const tempPost = {
        id: uuid.v4(),
        userId,
        content
    }

    const post = await Post.build(tempPost)

    const validate = await post.validate()
    
    await post.save()

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