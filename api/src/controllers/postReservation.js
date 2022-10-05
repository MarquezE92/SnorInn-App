const mongoose = require('mongoose');
const { Reservation } = require('../db');

const addResrevation = async ({ userId, roomId, check_in, check_out }) => {
    const add = new Reservation({
        userId,
        roomId,
        check_in,
        check_out
    })
    const addNewSchema = await add.save()
    return addNewSchema
};

module.exports = {
    addResrevation
}
