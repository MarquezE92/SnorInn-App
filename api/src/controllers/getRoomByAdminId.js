const mongoose = require('mongoose');
const { roomSchema, UserAdmin } = require('../db');

const getRoomsByUserAdmin = async () => {
    const foundRoomByAminId = await roomSchema.find({}).populate('userAdmin', {_id: 1})
    return foundRoomByAminId
};

module.exports = {
    getRoomsByUserAdmin
};
