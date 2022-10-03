const mongoose = require('mongoose');
const { roomSchema } = require('../db');

const getAllRooms = async () => {
    const find = await roomSchema.find()
    return find

}

module.exports = { getAllRooms };