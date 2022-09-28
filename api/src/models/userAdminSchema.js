import mongoose from 'mongoose';

const userAdminSchema = mongoose.Schema({
    _id: String,
    username: String,
    passwword: String,
    rooms: String,
    ban: String
});

const userAdminModel = mongoose.model('UserAdmin', userAdminSchema);

export default userAdminModel;
