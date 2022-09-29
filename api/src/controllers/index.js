const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()
// const { adminSchema, reviewsSchema, roomSchema, userSchema, reservationSchema } = require('../db')
const { roomSchema } = require('../db')

const addRooms = async (type, place, n_beds, price, availability = true, photo, rating) => {
    const add = new roomSchema({
        type,
        place,
        n_beds,
        price,
        availability,
        rating,
    })
    const addNewSchema = await add.save()
    return addNewSchema;

}

const getRooms = async () => {
    const response = await roomSchema.find()
    return response
}

module.exports = {
    getRooms,
    addRooms
}