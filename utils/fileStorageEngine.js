const multer = require("multer")
const uuid = require("uuid")
const path = require("path")

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./images")
    },
    filename: (req, file, callback) => {
        callback(null, uuid.v4() + path.extname(file.originalname))
    }
})

module.exports = fileStorageEngine