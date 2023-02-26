const Post = require("../Post")
const User = require("../User")

User.hasMany(Post);
Post.belongsTo(User, {
    foreignKey: "UserId"
});


User.sync({ alter: true })
Post.sync({ alter: true })
