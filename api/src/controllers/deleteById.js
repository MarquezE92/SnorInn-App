const mongoose = require('mongoose');
const cloudinary = require('../helpers/couldinary');
const { roomSchema } = require('../db');



const deleteRoom = async (id) => {
    const room = await roomSchema.findById(id) 
    const imageId = room.photos.public_id
    await cloudinary.uploader.destroy(imageId)
    const deletedOne = await roomSchema.findOneAndDelete({ _id: id })
    return deletedOne
}

module.exports = { deleteRoom };