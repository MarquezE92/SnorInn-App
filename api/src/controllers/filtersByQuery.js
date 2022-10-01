const mongoose = require('mongoose')
const {roomSchema} = require('../db')

// name
//n_beds
// type

module.exports = async (place, name, n_beds, type, page ) => { 
    if (name) {
        let foundRoomName = await roomSchema.paginate({place: {$regex: place, $options: "i"}, name: {$regex: name, $options: "i"}}, {limit:6, page: page})
        return foundRoomName
    }
    if (n_beds) {
        let foundRoomN_beds = await roomSchema.paginate({place: {$regex: place, $options: "i"}, n_beds: n_beds}, {limit:6, page: page})
        return foundRoomN_beds
    }
    if (type) {
        let foundRoomType = await roomSchema.paginate({place: {$regex: place, $options: "i"}, type: {$regex: type, $options: "i"}}, {limit:6, page: page})
        return foundRoomType
    }
} 