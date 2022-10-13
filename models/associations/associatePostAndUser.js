const Post = require("../Post")
const User = require("../User")

// Post.hasOne(User)
User.hasMany(Post)

User.sync()
Post.sync()
