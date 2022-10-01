const mongoose = require('mongoose');
const {roomSchema} = require('../db')

const getRoomsbyFilters = async (place) => {
    try{
            const foundRoom = await roomSchema.find({
                place: {$regex: place} 
            })
            return foundRoom

    } catch (error) {
        res.status(404).send({error: 'That place does not exist'})
    }
}

module.exports = {
    getRoomsbyFilters
}
