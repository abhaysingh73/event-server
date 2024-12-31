const Event = require('../models/Event');
const create_event = async (req, res) => {
    const {
        created_by_user_id,
        event_name,
        event_start_date,
        event_end_date,
        event_start_time,
        event_end_time,
        event_location,
        event_description,
        event_category,
        event_banner,
        max_participants,
        ticket_price
    } = req.body;

    if (!created_by_user_id || !event_name || !event_start_date || !event_end_date || !event_start_time || !event_end_time || !event_location || !event_description || !event_category || !event_banner || !max_participants) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const newEvent = new Event({
            created_by_user_id,
            event_name,
            event_start_date,
            event_end_date,
            event_start_time,
            event_end_time,
            event_location,
            event_description,
            event_category,
            event_banner,
            max_participants,
            ticket_price,
        });

        const savedEvent = await newEvent.save();

        res.status(201).json({
            message: 'Event created successfully',
            event: savedEvent,
        });
    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const get_events = async (req, res) => {
    try {
        const { category, created_by_user_id, limit = 10, page = 1 } = req.query;

        let query = {};
        if (category) {
            query.event_category = category;
        }
        if (created_by_user_id) {
            query.created_by_user_id = created_by_user_id;
        }

        const skip = (page - 1) * limit;

        const events = await Event.find(query)
            .skip(skip)
            .limit(Number(limit))
            .sort({ createdAt: -1 });

        const totalEvents = await Event.countDocuments(query);

        res.status(200).json({
            events,
            totalEvents,
            totalPages: Math.ceil(totalEvents / limit),
            currentPage: page,
        });
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = { create_event, get_events };