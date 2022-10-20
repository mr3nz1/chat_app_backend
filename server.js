require("dotenv").config()
require("express-async-errors")

const express = require("express")
const app = express()
const { connectDB, sequelize } = require("./db/connectDB")
const cors = require("cors")

const port = process.env.PORT || 5000

// middlewares
app.use(express.json())
app.use(
    cors({
        origin: 'http://localhost:3000',
        methods: ['POST', 'GET', 'DELETE', 'PATCH'],
    }),
)

// routes
const userRoutes = require("./routes/users")
const postRoutes = require("./routes/posts")

app.use("/api/v1/posts", postRoutes)
app.use("/api/v1/users", userRoutes)

// errors
const notFound = require("./middlewares/notFound")
const errorHandler = require("./middlewares/errorHandler")

// middlewares
app.use(notFound)
app.use(errorHandler)

// start server
const startServer = async () => {
    try {
        connectDB()
        app.listen(port, () => console.log(`Server listening on ${port}`))
    } catch (err) {
        console.log(err)
    }
}

startServer()

// const associatePostAndUser = require("./models/associations/associatePostAndUser")