const express = require("express");
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;
const connectDB = require('./config/db.js');
const authRoutes = require('./routes/authRoutes');
const emailVerificationRoutes = require('./routes/emailVerificationRoutes');
const eventRoutes = require('./routes/eventRoutes');
const { connectRedis } = require('./utils/redisClient');

connectDB();
connectRedis();
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/verify-email', emailVerificationRoutes);
app.use('/event', eventRoutes);

app.get("/", (req, res) => {
    res.send({ message: "Hello" });
});

app.listen(PORT, () => console.log(`Server running on POPT:${PORT}`));