const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { jwtSecret } = require('../config/auth');

const verifyEmail = async (req, res) => {
  const { token } = req.query;

  if (!token) {
    return res.status(400).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    const userId = decoded.userId;

    const user = await User.findOne({ user_id: userId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.email_verified) {
      return res.status(400).json({ message: 'Email is already verified' });
    }

    user.email_verified = true;
    await user.save();
    res.status(200).json({ message: 'Email successfully verified' });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Invalid or expired token' });
  }
};

module.exports = { verifyEmail };