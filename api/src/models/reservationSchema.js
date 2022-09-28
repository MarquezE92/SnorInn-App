import mongoose from 'mongoose';

const reservationSchema = mongoose.Schema({
    _id: String,
    userId: String,
    roomId: String,
    check_in: Date,
    checkIut: Date,
    price: Number
});

const reservationModel = mongoose.model('Reservation', reservationSchema);

export default reservationModel;