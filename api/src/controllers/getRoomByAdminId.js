const mongoose = require('mongoose');
const { UserAdmin } = require('../db');

const getRoomsByUserAdmin = async (id) => {
    const foundRoomByAminId = await UserAdmin.findById(id).populate('rooms')
    return foundRoomByAminId
};

module.exports = {
    getRoomsByUserAdmin
};
