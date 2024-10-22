const jwt = require('jsonwebtoken');
const dotenv = require("dotenv"); //For using process.env


const authenticate = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract the token from the Authorization header
    if (!token) return res.sendStatus(403); // Forbidden if no token is present

    jwt.verify(token, `${process.env.Jwt_Token}`, (err, user) => {
        if (err) return res.sendStatus(403); // Forbidden if token is invalid
        req.user = user; // Attach user info to req.user
        next(); // Proceed to the next middleware/route handler
    });
};

module.exports = authenticate;
