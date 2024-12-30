const { verifyEmail } = require('../controllers/emailVerification');
const router = require('express').Router();

router.get('/', verifyEmail);

module.exports = router;