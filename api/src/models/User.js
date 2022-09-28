const mongoose = require('mongoose')

const USER = mongoose.Schema({
    username: String,
    password: String,
    firstname: String,
    lastname: String,
    age: Number,
    email: String,
    address: String,
    rating: Number
}, {versionKey: false})

module.exports = mongoose.model('user', USER)