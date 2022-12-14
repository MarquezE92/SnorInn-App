const mongoose = require('mongoose');
const { UserAdmin } = require('../db');

//Modificamos el esquema de donde busca la info antes era 'userAdmin' ahora es 'UserClient'
const getRoomsByUserAdmin = async (id) => {
    //const populateLog = {path: 'rooms.reservationId'}
    const foundRoomByAdminId = await UserAdmin.findById(id).populate({
        path: 'rooms',
        populate: { path: 'reservationId' }
    });
    return foundRoomByAdminId
};

module.exports = {
    getRoomsByUserAdmin
};
