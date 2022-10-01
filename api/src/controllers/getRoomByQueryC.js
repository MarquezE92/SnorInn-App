const mongoose = require('mongoose');
const {roomSchema} = require('../db')

const getRoomsbyFilters = async (place, page) => {
    try{
            const foundRoom = await roomSchema.paginate({place: {$regex: place, $options: "i" }} ,{limit: 6, page: page})
            return foundRoom

    } catch (error) {
        res.status(404).send({error: 'That place does not exist'})
    }
}

module.exports = {
    getRoomsbyFilters
}
