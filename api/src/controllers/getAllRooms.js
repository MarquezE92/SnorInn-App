const { roomSchema } = require('../models');
//const axios = require('axios');


const getAllRooms = async (req, res) => {
    try {
        const allRooms = await roomSchema.find()
        if (allRooms) {
            allRooms.filter(e => e._id)
            res.json(allRooms)
        } else {
            res.status(404).send('Ups...There are no rooms to show... try refresh')
        }
    } catch (error) {
        res.status(404).json(error)
    }
};
module.exports = { getAllRooms }