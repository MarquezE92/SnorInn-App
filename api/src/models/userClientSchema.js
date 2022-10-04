const mongoose = require('mongoose');

const userClientSchema = mongoose.Schema({
    username: String,
    password: String,
    firstname: String,
    lasrname: String,
    age: Number,
    email: String,
    address: String,
    rating: Number,
    favoritesRomms: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'room'
    }],
    reservationId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reservation'
    }]
}, { versionKey: false });
module.exports = mongoose.model('UserClient', userClientSchema);