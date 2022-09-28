const mongoose = require('mongoose')

const ROOM = mongoose.Schema({
    type: String,
    place: String,
    n_beds: Number,
    price: Number,
    availability: Boolean,
    services: Array,
    photos: Image,
    rating: Number,
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'reviews'
    }]
}, {versionKey: false})

module.exports = mongoose.model('room', ROOM)