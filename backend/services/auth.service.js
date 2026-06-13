const User = require("../models/User");

const registerUser = async (userData) => {
    const newUser = new User({
        username: userData.username,
        email: userData.email,
        password: userData.password
    });

    return await newUser.save();
};

const loginUser = async (email, password) => {
    return await User.findOne({
        email,
        password
    });
};

module.exports = {
    registerUser,
    loginUser
};