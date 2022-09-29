import mongoose from 'mongoose';

const userAdminSchema = mongoose.Schema({
    username: String,
    passwword: String,
    rooms: Array,
    ban: Boolean
}, { versionKey: false });

module.exports = mongoose.model('UserAdmin', userAdminSchema);