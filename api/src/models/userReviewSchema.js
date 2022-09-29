const mongoose = require('mongoose');

const userReviewSchema = mongoose.Schema({
    adminId: String,
    userId: String,
    reservationId: String,
    roomId: String,
    stars: Number,
    comment: String,

}, {versionKey: false})

module.exports = mongoose.model('userReviewSchema', userReviewSchema)