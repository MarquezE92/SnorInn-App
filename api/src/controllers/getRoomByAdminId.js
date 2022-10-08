const mongoose = require('mongoose');
const { UserClient } = require('../db');

//Modificamos el esquema de donde busca la info antes era 'userAdmin' ahora es 'UserClient'
const getRoomsByUserAdmin = async (id) => {
    const foundRoomByAdminId = await UserClient.findById(id).populate('rooms')
    return foundRoomByAdminId
};

module.exports = {
    getRoomsByUserAdmin
};
