const Sequelize = require("sequelize")

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        host: process.env.HOST,
        dialect: "mysql"
    }
)

const connectDB = async () => {
    try {
        await sequelize.authenticate()
        console.log("Successfuly connected to DB")
    } catch (err) {
        console.log("UNable to connect to DB")
    }
}

module.exports = {
    sequelize,
    connectDB
}