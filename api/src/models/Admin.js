const mongoose = require('mongoose')

const ADMIN = mongoose.Schema({
    username: String,
    password: String,
}, {versionKey: false})

module.exports = mongoose.model('admin', ADMIN)