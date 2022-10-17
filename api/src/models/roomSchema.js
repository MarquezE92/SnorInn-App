const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const roomSchema = mongoose.Schema({
    name: String,
    description: String,
    type: String, //cambie por un array
    place: String,
    n_beds: Number, // cambie por un array
    price: Number, // aca paso de number a string
    //availability: Boolean,
    // location: [{type: String}],
    services: [{type: String}],
    photos: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        }
    },
    rating: Number,
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'reviews'
    }],
    userAdminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userAdmin'
    },
    reservationId: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'reservation'
        }],
//para constatar en qué fechas no se puede reservar
    unavailableDates: [Date],

}, {versionKey: false})

roomSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('room', roomSchema)