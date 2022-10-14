const mongoose = require('mongoose')
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
};

module.exports = {addRooms}