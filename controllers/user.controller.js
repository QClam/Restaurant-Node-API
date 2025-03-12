const bcryt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/user.model.js');
const { generateToken, generateRefreshToken } = require('../utils/token.js');

//register user
const register = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'Email đã tồn tại' });
        }

        const hashedPassword = await bcryt.hash(password, 10);
        user = new User({
            username,
            email,
            password: hashedPassword
        });

        res.status(201).json({ message: 'Đăng ký thành công' });
        await user.save();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//login user
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Tài khoản không tồn tại' });
        }

        const isMatch = await bcryt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Mật khẩu không đúng' });
        }

        const accessToken = generateToken(user);
        const refreshToken = generateRefreshToken(user);

        //save refresh token
        user.refreshToken = refreshToken;
        await user.save();

        //send refresh token as cookie
        res.cookie('resfreshToken', refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict'
        })

        res.json({ accessToken, refreshToken });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//refresh token
const refresh = async (req, res) => {
    const refreshToken = req.body.refreshToken;

    if (!refreshToken) {
        return res.status(400).json({ message: 'Không có Refresh Token' });
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN);

        const user = await User.findById(decoded._id)
        if (!user || user.refreshToken !== refreshToken) {
            return res.status(403).json({ message: 'Refresh token không hợp lệ' });
        }

        //create new access token
        const newAccessToken = generateToken(user);
        res.json({ accessToken: newAccessToken });
    } catch (error) {
        res.status(403).json({ message: "Token không hợp lệ" });
    }
}

const logout = async (req, res) => {
    const user = await User.findById(req.user._id);
    if(user) {
        user.refreshToken = null,
        await user.save();
    }

    res.clearCookie('refreshToken');
    res.json({ message: 'Đăng xuất thành công' });
}


module.exports = {
    register,
    login,
    refresh,
    logout
}


