const mongoose = require('mongoose');
const { mongoURI } = require('../config/env/development.js');

const connectDB = async () => {
    try{
        await mongoose.connect(mongoURI);
        console.log('MongoDB connected successfully');
    }catch(err){
        console.error('Error connecting to MongoDB:', err.message);
         process.exit(1);
    }
}

module.exports = connectDB;