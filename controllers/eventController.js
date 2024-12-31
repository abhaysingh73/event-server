const Event = require('../models/Event');
const { redisClient } = require('../utils/redisClient');
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
        const { category, created_by_user_id, limit = 10, page = 1, use_cache = true } = req.query;
        let query = {};
        if (category) {
            query.event_category = category;
        }
        if (created_by_user_id) {
            query.created_by_user_id = created_by_user_id;
        }

        const skip = (page - 1) * limit;

        const cachekey = `events:${category || 'all'}:${created_by_user_id || 'all'}:${page}:${limit}`;
        const cachedData = await redisClient.get(cachekey);
        if (cachedData && use_cache == true) {
            let cachedData_temp = JSON.parse(cachedData);
            cachedData_temp.is_cached = true;
            return res.status(200).json(cachedData_temp);
        }

        const events = await Event.find(query)
            .skip(skip)
            .limit(Number(limit))
            .sort({ createdAt: -1 });

        const totalEvents = await Event.countDocuments(query);

        const responseData = {
            events,
            totalEvents,
            totalPages: Math.ceil(totalEvents / limit),
            currentPage: page,
        }

        redisClient.setEx(cachekey, 3600, JSON.stringify(responseData));

        res.status(200).json(responseData);

    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = { create_event, get_events };