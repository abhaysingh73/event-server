const nodemailer = require('nodemailer');
require('dotenv').config();
const { server_url } = require('../config/env/development');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_ID,
    pass: process.env.EMAIL_PASSWORD,
  },
});

async function sendVerificationEmail(userEmail, token) {
  const verificationUrl = `${server_url}:${process.env.PORT}/verify-email?token=${token}`;

  const mailOptions = {
    from: 'your-email@gmail.com',
    to: userEmail,
    subject: 'Email Verification',
    html: `
      <h2>Welcome!</h2>
      <p>Thank you for registering. Please verify your email address by clicking the link below:</p>
      <a href="${verificationUrl}">Verify Email</a>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Verification email sent');
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

module.exports = { sendVerificationEmail }