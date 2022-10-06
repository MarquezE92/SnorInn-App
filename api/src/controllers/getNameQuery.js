const mongoose = require('mongoose')
const {roomSchema} = require('../db')

const getName = async (name) => {

        const foundRoom = await roomSchema.find({name})
        return foundRoom
}

module.exports = {
    getName
}