const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const roomSchema = mongoose.Schema({
    name: String,
    description: String,
    type: String, //cambie por un array
    place: String,
    n_beds: Number, // cambie por un array
    price: Number, // aca paso de number a string
    availability: Boolean,
    // location: [{type: String}],
    services: [{type: String}],
    photos: [{type: String}],
    rating: Number,
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'reviews'
    }],
    userAdminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserAdmin'
    },

}, {versionKey: false})

roomSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('room', roomSchema)