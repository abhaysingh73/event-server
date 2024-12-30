const mongoose = require('mongoose');
const { Schema } = mongoose;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const userSchema = new Schema({
    user_id: {
        type: Number,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 50,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, 'Please fill a valid email address'],
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    phone_number: {
        type: String,
        required: false,
        match: [/^\+?[1-9]\d{1,14}$/, 'Please fill a valid phone number'],
        trim: true,
    },
    profile_completed: {
        type: Boolean,
        default: false,
    },
    profile_picture: {
        type: String,
        required: false,
    },
    //   created_events: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'Event',
    //   }],
    //   joined_events: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'Event',
    //   }],
    //   payment_info: {
    //     type: Schema.Types.Mixed,
    //     required: false,
    //   },
    email_verified: { type: Boolean, default: false }
}, {
    timestamps: true,
});

userSchema.plugin(AutoIncrement, { inc_field: 'user_id' });
const User = mongoose.model('User', userSchema);

module.exports = User;