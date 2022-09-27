const { DataTypes, Model } = require("sequelize")
const { sequelize } = require("../db/connectDB")

class User extends Model {}

User.init(
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            validate: {
                isUUID: 4,
            }
        },
        fullNames: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                max: 20
            }
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                max: 20
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                min: 8
            }
        },
        profileImage: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        bannerImage: {
            type: DataTypes.STRING,
            allowNull: true
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                max: 100
            }
        }
    },
    {
        sequelize,
        timestamps: true
    }
)

module.exports = User