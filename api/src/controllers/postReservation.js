const mongoose = require('mongoose');
const { Reservation, UserClient } = require('../db');

const addResrevation = async ({ userId, roomId, check_in, check_out, totalPrice }) => {
    const user = await UserClient.findById(userId)
    const add = new Reservation({
        userId,
        roomId,
        check_in,
        check_out,
        totalPrice
    })
    const addNewSchema = await add.save()
    user.reservationId = user.reservationId.concat(addNewSchema._id)
    await user.save()
    return addNewSchema
};

module.exports = {
    addResrevation
}
