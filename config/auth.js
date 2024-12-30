require('dotenv').config();

module.exports = {
    jwtSecret: process.env.JWT_SECRET || "asjgdayuletwg36483v3286rf3ve",
    jwtExpiration: '1h',
    jwtRefreshExpiration: '7d',
    jwtAlgorithm: 'HS256',
    tokenPrefix: 'Bearer'
}