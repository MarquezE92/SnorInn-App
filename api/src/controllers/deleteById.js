const mongoose = require('mongoose');
const { roomSchema } = require('../db');

const deleteRoom = async (id) => {
    const deletedOne = await roomSchema.findOneAndDelete({ _id: id })
    return deletedOne

}

module.exports = { deleteRoom };