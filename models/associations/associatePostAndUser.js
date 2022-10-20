const Post = require("../Post")
const User = require("../User")

// Post.hasOne(User, {
//     foreignKey: "userId"
// })

User.hasMany(Post, {
    foreignKey: "userId"
})

Post.belongsTo(User, {
    foreignKey: "userId"
})

// User.hasMany(Validacoes, { foreignKey: 'NR_VALIDADO', as: 'ValidadoValidacoes' })

// User.associate = models => {
//     User.hasMany(models.Post, { foreginKey: 'userId' });
// }

// Post.associate = models => {
//     Post.belongsTo(models.User, { as: 'ta', foreginKey: 'a_id' });
// }




User.sync({ alter: true })
Post.sync({ alter: true })
