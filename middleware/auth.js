const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) {
        return res.status(403).json({ message: "Không có token" });
    }

    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.ACCESS_TOKEN);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Token hết hạn, vui lòng refresh" });
    }
}