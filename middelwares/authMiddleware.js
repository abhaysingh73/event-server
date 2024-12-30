const jwt = require('jsonwebtoken');
const config = require('../config/auth');

const verifyToken = (req, res, next) => {
    try {
        const token = req.header('Authorization')?.split(" ")[1];
        if (!token) {
            return res.status(403).json({ message: 'Access Denied, Token not provided' });
        }

        jwt.verify(token, config.jwtSecret, (err, user) => {
            if (err) {
                return res.status(403).json({ message: 'Invalid Token' });
            }
            req.user = user;
            next();
        });
    } catch (err) {
        console.error('Error verifying token:', err.stack);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

function isEmailVerified(req, res, next) {
    if (!req.user.isVerified) {
      return res.status(403).json({ message: 'Please verify your email first' });
    }
    next();
  }

module.exports = { verifyToken, isEmailVerified };