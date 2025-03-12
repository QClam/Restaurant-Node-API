const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchma = new Schema(
    {

        username: {
            type: String,
            required: [true, 'Username is required']
        },

        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true
        },

        password: {
            type: String,
            required: [true, 'Password is required']
        },

        refreshToken: {
            type: String
        },

    },

    {
        timestamps: true,
    }
)

const User = mongoose.model('User', UserSchma);
module.exports = User;