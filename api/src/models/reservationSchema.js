const mongoose = require('mongoose');

const reservationSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserClient'
    },
    roomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'room'
    },
    check_in: Date,
    check_out: Date,
    totalPrice: Number
}, { versionKey: false });

module.exports = mongoose.model('reservation', reservationSchema);