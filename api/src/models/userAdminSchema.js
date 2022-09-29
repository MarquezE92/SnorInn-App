const  mongoose = require('mongoose');


const userAdminSchema = mongoose.Schema({
    username: String,
    passwword: String,
    rooms: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'room'
    }],
    ban: Boolean
}, { versionKey: false });

module.exports = mongoose.model('UserAdmin', userAdminSchema);