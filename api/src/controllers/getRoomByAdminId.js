const mongoose = require('mongoose');
const { UserAdmin } = require('../db');

const getRoomsByUserAdmin = async (id) => {
    const foundRoomByAdminId = await UserAdmin.findById(id).populate('rooms')
    return foundRoomByAdminId
};

module.exports = {
    getRoomsByUserAdmin
};
