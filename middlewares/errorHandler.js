const { StatusCodes } = require("http-status-codes")

const errorHandler = (err, req, res, next) => {
    const customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        message: err.message || "Something went wrong try again later"
    }

    
    if (err.name === "SequelizeValidationError") {
        const errors = err.errors.map(error => {
            return {
                field: error.path,
                message: error.message,
                value: error.value
            }
        });

        return res.status(customError.statusCode).json(errors)
    }


    if (err.name === "SequelizeUniqueConstraintError") {
        const errors = err.errors.map(error => {
            return {
                field: error.path,
                message: error.message,
                value: error.value
            }
        })

        return res.status(customError.statusCode).json(errors)
    }

    // return res.status(customError.statusCode).json({ msg: customError.message })
    return res.status(customError.statusCode).json(err)
}

module.exports = errorHandler