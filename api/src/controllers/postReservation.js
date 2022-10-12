const mongoose = require('mongoose');
const { Reservation, UserClient, roomSchema } = require('../db');

const addResrevation = async ({ userId, roomId, check_in, check_out, dates, totalPrice}) => {
    const findRoom = await roomSchema.findById(roomId)
    //if (!findRoom.availability) {throw new Error('The room is not available')}
    const user = await UserClient.findById(userId)
    const add = new Reservation({
        userId,
        roomId,
        check_in,
        check_out,
        totalPrice
    })
    const addNewSchema = await add.save()
    //findRoom.availability = false
    findRoom.reservationId = findRoom.reservationId.concat(addNewSchema._id);
    findRoom.unavailableDates = findRoom.unavailableDates.concat(...dates);
    await findRoom.save()
    user.reservationId = user.reservationId.concat(addNewSchema._id)
    await user.save()
    return addNewSchema
};

module.exports = {
    addResrevation
}
