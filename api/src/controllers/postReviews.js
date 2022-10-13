const mongoose = require("mongoose");
const { roomSchema, ReviewRoom, UserClient } = require('../db');

const addReview = async ({userId, reservationId, roomId, stars, comment}) => {
    const getRooms = await roomSchema.findById(roomId)
    const addNewReview = new ReviewRoom({
        userId,
        reservationId,
        roomId,
        stars,
        comment
    }, { versionKey: false });
    const addNewSchema = await addNewReview.save()
    getRooms.reviews = getRooms.reviews.concat(addNewReview._id);
    await getRooms.save();
    return addNewSchema
};

module.exports = {
    addReview
}
