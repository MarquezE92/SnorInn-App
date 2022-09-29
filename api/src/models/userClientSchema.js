import mongoose from 'mongoose';

const userClientSchema = mongoose.Schema({
    username: String,
    password: String,
    firstname: String,
    lasrname: String,
    age: Number,
    email: String,
    address: String,
    rating: Number
}, { versionKey: false });
module.exports = mongoose.model('UserClient', userClientSchema);