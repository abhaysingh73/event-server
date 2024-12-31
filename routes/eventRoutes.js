const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController.js');

router.post('/create-event', eventController.create_event);
router.get('/fetch-events', eventController.get_events);

module.exports = router;