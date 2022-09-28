const mongoose = require('mongoose')

const RESERVATION = mongoose.Schema({
    userId: ObjectId,
    roomId: ObjectId,
    check_in: Date,
    check_out: Date,
    price: Number    
}, {versionKey: false})

module.exports = mongoose.model('reservation', RESERVATION)