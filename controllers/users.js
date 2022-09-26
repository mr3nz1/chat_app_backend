const login = async (req, res) => {
    res.send("login route")
}

const register = async (req, res) => {
    res.send("register route")
}

const getUser = async (req, res) => {
    res.send("getUser route")
}

const editUser = async (req, res) => {
    res.send("editUser route")
}

const removeUser = async (req, res) => {
    res.send("removeUser route")
}

const getAllUsers = async (req, res) => {
    res.send("getAllUsers route")
}

module.exports = {
    login,
    register,
    getUser,
    editUser,
    removeUser,
    getAllUsers,
}