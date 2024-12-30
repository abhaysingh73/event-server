const bcrypt = require('bcrypt');
const User = require('../models/User');
const { generateToken } = require('../utils/generateToken');
const {sendVerificationEmail} = require('../services/emailService');
const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!(username && password)) {
            return res.status(400).json({ message: 'Username and password are required' });
        }
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);  // Use await for bcrypt.compare
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }
        const token = await generateToken({ id: user.user_id, role: user.role });
        return res.status(200).json({
            message: 'Login successful',
            token: token,
            user: {
                userId: user.user_id,
                username: user.username,
                email: user.email,
                profileCompleted: user.profile_completed,
            },
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
}

const register = async (req, res) => {
    try {
        const { username, email, password, phone_number } = req.body;

        if (!(username && email && password)) {
            return res.status(400).json({ message: 'Username, email, and password are required' });
        }

        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Username or email is already taken' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            phone_number,
            profile_completed: false,
        });
        await newUser.save();

        const token = await generateToken({ id: newUser.user_id, role: newUser.role });

        await sendVerificationEmail(newUser.email, token);

        return res.status(201).json({
            message: 'User registered successfully',
            token: token,
            user: {
                userId: newUser.user_id,
                username: newUser.username,
                email: newUser.email,
                profileCompleted: newUser.profile_completed,
            },
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
};

module.exports = {
    login,
    register
}