const mongoose = require('mongoose')
const {roomSchema} = require('../db')

const getName = async (name, page) => {

        const foundRoom = await roomSchema.paginate({name: {$regex: name, $options: "i" }} ,{limit: 6, page: page})
        return foundRoom
}

module.exports = {
    getName
}