const mongoose = require("mongoose");
const { roomSchema, ReviewRoom, UserClient } = require('../db');

const addReview = async ({userId, reservationId, roomId, stars, comment}) => {
    const getRooms = await roomSchema.findById(roomId)
    const validate = await ReviewRoom.find({userId})
    if(validate.length) throw new Error('you had a coment in this room');
    const addNewReview = new ReviewRoom({
        userId,
        reservationId,
        roomId,
        stars,
        comment
    }, { versionKey: false });
        const addNewSchema = await addNewReview.save()
        const getRoomsReview = await ReviewRoom.find({roomId})
        let preRating = getRooms.rating*getRoomsReview.length
        preRating+= stars
        getRooms.rating = Math.round(preRating/(getRoomsReview.length + 1))
        getRooms.reviews = getRooms.reviews.concat(addNewReview._id);
    await getRooms.save();
    return addNewSchema
};

module.exports = {
    addReview
}
