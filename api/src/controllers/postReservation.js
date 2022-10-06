const mongoose = require('mongoose');
const { Reservation } = require('../db');

const addResrevation = async ({ userId, roomId, check_in, check_out, totalPrice }) => {
    const add = new Reservation({
        userId,
        roomId,
        check_in,
        check_out,
        totalPrice
    })
    const addNewSchema = await add.save()
    return addNewSchema
};

module.exports = {
    addResrevation
}
