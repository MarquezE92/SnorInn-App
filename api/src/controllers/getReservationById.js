const mongoose = require('mongoose');
const { Reservation } = require('../db')

const getReservation = async (id) => {
    const getIdReservation = await Reservation.findById(id)
    return getIdReservation
};

module.exports = { getReservation };