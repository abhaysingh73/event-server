const mongoose = require('mongoose');
const { Schema } = mongoose;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const eventSchema = new Schema({
    event_id: {
        type: Number,
        unique: true
    },
    created_by_user_id: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }],
    event_name: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    event_start_date: {
        type: Date,
        required: true,
    },
    event_end_date: {
        type: Date,
        required: true,
    },
    event_start_time: {
        type: String,
        required: true,
    },
    event_end_time: {
        type: String,
        required: true,
    },
    event_location: {
        type: String,
        required: true,
    },
    event_description: {
        type: String,
        required: true,
    },
    event_category: {
        type: String,
        enum: ['sports', 'music', 'conference', 'party', 'comedy', 'other'],
        required: true,
    },
    event_banner: {
        type: String,
        required: true,
    },
    max_participants: {
        type: Number,
        required: true,
        min: 1
    },
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    ticket_price: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    }
}, {
    timestamps: true
});

eventSchema.plugin(AutoIncrement, { inc_field: 'event_id' });
const eventModel = mongoose.model('Event', eventSchema);
module.exports = eventModel;