const { DataTypes, Model } = require("sequelize")
const { sequelize } = require("../db/connectDB")

class User extends Model {}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true.valueOf,
            primaryKey: true
        },

    },
    {
        sequelize,
        timestamps: true
    }
)

module.exports = User