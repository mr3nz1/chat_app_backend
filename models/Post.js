const { DataTypes, Model } = require("sequelize")
const { sequelize } = require("../db/connectDB")
const User = require("./User")

class Post extends Model { }

Post.init(
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            validate: {
                isUUID: 4
            },
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                max: 20
            }
        },
        // userId: {
        //     type: DataTypes.STRING,
        //     references: {
        //         model: User,
        //         key: "id",
        //         allowNull: false
        //     }
        // }
    },
    {
        sequelize,
        timestamps: true
    }
)


module.exports = Post