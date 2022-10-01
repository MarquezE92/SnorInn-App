const mongoose = require('mongoose');
const {roomSchema} = require('../db')

const getRoomsbyFilters = async (place) => {
    try{
        //const {place} = req.query;
        if(place){
            const foundRoom = await roomSchema.find({
                place: {$regex: place} 
            })
            return foundRoom

        } else {
            res.status(404).send({error: 'That place does not exist'})
        }

    } catch (error) {
        res.status(404).send({error: 'That place does not exist'})
    }
}

module.exports = {
    getRoomsbyFilters
}
