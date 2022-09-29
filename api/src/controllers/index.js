const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()
// const { adminSchema, reviewsSchema, roomSchema, userSchema, reservationSchema } = require('../db')
const { roomSchema } = require('../db')

const addRooms = async()=>{
    const add = new roomSchema({
        type: '123',
        place: '123',
        n_beds: 1,
        price: 100,
        availability: true,
        services: [],
        rating: 1
    })
    await add.save()
}

const getRooms = async()=>{
    const response = await roomSchema.find()
    return response
}

module.exports = {
    getRooms,
    addRooms
}