const mongoose = require('mongoose')

const roomSchema = mongoose.Schema({
    type: String,
    place: String,
    n_beds: Number,
    price: Number,
    availability: Boolean,
    services: [{type: String}],
    photos: [{type: String}],
    rating: Number,
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'reviews'
    }]
}, {versionKey: false})

module.exports = mongoose.model('room', roomSchema)