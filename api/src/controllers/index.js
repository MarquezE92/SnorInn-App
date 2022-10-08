const mongoose = require('mongoose')
// const express = require('express')
// const router = express.Router()
// const { adminSchema, reviewsSchema, roomSchema, userSchema, reservationSchema } = require('../db')
const { roomSchema } = require('../db')
const { UserClient } = require ('../db')

const addRooms = async ({type,name, description, place, n_beds, price, services, availability = true, photos = ['ñ'], rating}, idAdmin) => {
    //traemos el admin que está creando la room
    const admin = await UserClient.findById(idAdmin)
    const add = new roomSchema({
        type,
        name,
        description,
        place,
        n_beds,
        price,
        availability,
        rating,
        services: services,
        photos: photos,
        userAdminId: idAdmin
    })
    const addNewSchema = await add.save();
    //Agregamos en el Admin, la room creada a su array de rooms
    admin.rooms = admin.rooms.concat(addNewSchema._id);
    await admin.save();
    return addNewSchema;

}

const getRooms = async (page) => {
    const response = await roomSchema.paginate({},{limit:6, page: page})
    return response
}

const findByIdRoom = async (id) => {
    const find = await roomSchema.findById(id)
    return find
}






module.exports = {
    getRooms,
    addRooms,
    findByIdRoom
}