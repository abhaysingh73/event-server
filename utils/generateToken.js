const jwt = require('jsonwebtoken');
const config = require('../config/auth');
const generateToken = (user) => {
    try {
        const payload = {
            userId: user.id,
            role: user.role,
        };

        return jwt.sign(payload, config.jwtSecret, {
            expiresIn: config.jwtExpiration,
            algorithm: config.jwtAlgorithm,
        });
    } catch (err) {
        console.error('Error generating token:', err.stack);
        return null;
    }
};

module.exports = { generateToken };