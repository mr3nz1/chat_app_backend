require("dotenv").config()
require("express-async-errors")

const express = require("express")
const app = express()
const { connectDB } = require("./db/connectDB")
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