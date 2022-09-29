const mongoose = require('mongoose');

const roomReviewsSchema = mongoose.Schema({
    userId: String,
    reservationId: String,
    roomId: String,
    stars: Number,
    comment: String,

}, {versionKey: false})

module.exports = mongoose.model('roomReviewsSchema', roomReviewsSchema)