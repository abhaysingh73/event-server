const redis = require('@redis/client');

const redisClient = redis.createClient({
    host: process.env.REDIS_HOST || 'localhost',
    port: 6379,
});

const connectRedis = async () => {
    try {
        await redisClient.connect();
        console.log('Successfully connected to Redis');
    } catch (err) {
        console.error('Error connecting to Redis:', err);
    }
};

module.exports = {redisClient,connectRedis};