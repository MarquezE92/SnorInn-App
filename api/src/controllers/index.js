const mongoose = require('mongoose')
// const express = require('express')
// const router = express.Router()
// const { adminSchema, reviewsSchema, roomSchema, userSchema, reservationSchema } = require('../db')
const { roomSchema, UserClient, UserAdmin } = require('../db')
const cloudinary = require('../helpers/couldinary');

const addRooms = async ({ type, name, description, place, n_beds, price, services, availability = true, photos = ['ñ'], rating }, idAdmin) => {
    //traemos el admin que está creando la room
    const admin = await UserAdmin.findById(idAdmin)
    const result = await cloudinary.uploader.upload(photos, {
        folder: 'rooms'
    })
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
        photos: {
            public_id: result.public_id,
            url: result.secure_url
        },
        userAdminId: idAdmin
    })
    const addNewSchema = await add.save();
    //Agregamos en el Admin, la room creada a su array de rooms
    admin.rooms = admin.rooms.concat(addNewSchema._id);
    await admin.save();
    return addNewSchema;

}

const getRooms = async (page) => {
    const response = await roomSchema.paginate({}, { limit: 6, page: page })
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