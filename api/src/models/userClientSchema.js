import mongoose from 'mongoose';

const userClientSchema = mongoose.Schema({
    _id: String,
    username: String,
    password: String,
    firstname: String,
    lasrname: String,
    age: Number,
    email: String,
    address: String,
    rating: Number
});
const userClientModel = mongoose.model('UserClient', userClientSchema);

export default userClientModel;