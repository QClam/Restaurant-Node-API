const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (user) => {
    return jwt.sign(
        {
            _id: user._id,
            name: user.name,
            username: user.username,
        },

        process.env.ACCESS_TOKEN,

        {
            expiresIn: "1m",
        }
    );
};

const generateRefreshToken = (user) => {
    return jwt.sign(
        {
            _id: user._id,
            name: user.name,
            username: user.username,
        },

        process.env.REFRESH_TOKEN,

        {
            expiresIn: "7d",
        }
    );
};

module.exports = {
    generateToken,
    generateRefreshToken
};
