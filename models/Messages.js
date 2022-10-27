const mongoose = require('mongoose');

const MessagesSchema = new mongoose.Schema([
    {
        firstName: { type: String },
        lastName: { type: String },
        email: { type: String },
        phoneNumber: { type: String },
        message: { type: String },
        unRead: { type: Boolean, default: true },
        date: { type: Date, default: Date.now },
    },
]);

module.exports = mongoose.model('Messages', MessagesSchema);
