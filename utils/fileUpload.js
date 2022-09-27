const multer = require("multer")
const fileStorageEngine = require("./fileStorageEngine")

const fileUpload = multer({
    storage: fileStorageEngine
})

module.exports = fileUpload