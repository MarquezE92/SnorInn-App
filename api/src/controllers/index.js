const mongoose = require('mongoose')
// const express = require('express')
// const router = express.Router()
// const { adminSchema, reviewsSchema, roomSchema, userSchema, reservationSchema } = require('../db')
const { roomSchema } = require('../db')

const addRooms = async ({type,name, description, place, n_beds, price, services, availability = true, photos = ['ñ'], rating}) => {
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
        photos: photos
    })
    const addNewSchema = await add.save()
    return addNewSchema;

}

const getRooms = async () => {
    const response = await roomSchema.find()
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