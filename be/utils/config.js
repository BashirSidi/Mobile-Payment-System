require('dotenv').config();
const jwt = require("jsonwebtoken")
const logger = require("./logger.js")

const auth = async (req, res, next) => {
    try {
        const authader = await req.headers.authorization;
       if(!authader) throw new logger.customError("Token not found!", 404)

       const token = req.headers.authorization.split(' ')[1]

       const decoded = await jwt.verify(token, process.env.screteJWT, {
        expiresIn: '1h'
    });
    if(!decoded) throw new logger.customError("UnAuthorized", 401);

    req.userId = decoded.id
    req.user = decoded
    next();
    } catch (err) {
        res.status(401).json("Invalid Token");
    }
}

const DB_URL = process.env.MONGO_URL;

const PORT = 6000;

module.exports = {
    auth,
    DB_URL,
    PORT
};