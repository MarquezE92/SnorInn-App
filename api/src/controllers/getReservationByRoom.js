const mongoose = require('mongoose');
const { roomSchema } = require('../db');

const getReservationByRoom = async (_id) => {
    const foundRoomById = await roomSchema.findById(_id).populate(['reservationId'])
    return foundRoomById
};

module.exports = {
    getReservationByRoom
};