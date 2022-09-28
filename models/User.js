const { DataTypes, Model } = require("sequelize")
const { sequelize } = require("../db/connectDB")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

class User extends Model {
    async createJWT() {
        const payload = {
            userId: this.id
        }

        const secretKey = process.env.JWT_SECRET_KEY

        const options = {
            expiresIn: process.env.JWT_LIFETIME
        }

        return jwt.sign(payload, secretKey, options)
    }

    async comparePasswords(candidatePassword) {
        const isMatch = await bcrypt.compare(candidatePassword, this.password)
        return isMatch
    }
}

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

User.beforeCreate(async (user) => {
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)
});
  
User.beforeUpdate(async (user) => {
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)
})
module.exports = User