import mongoose from 'mongoose';

const userAdminSchema = mongoose.Schema({
    username: String,
    passwword: String,
    rooms: Array,
    ban: String
}, { versionKey: false });

module.exports = mongoose.model('UserAdmin', userAdminSchema);