import mongoose from 'mongoose';

const reservationSchema = mongoose.Schema({
    userId: String,
    roomId: String,
    check_in: Date,
    checkIut: Date,
    price: Number
}, { versionKey: false });

module.exports = mongoose.model('Reservation', reservationSchema);