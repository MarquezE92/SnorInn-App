const mongoose = require('mongoose')

const REVIEWS = mongoose.Schema({
    userId: ObjectId,
    roomId: ObjectId,
    reservationId: ObjectId,
    stars: Number,
    comment: String
}, {versionKey: false})

module.exports = mongoose.model('reviews', REVIEWS)