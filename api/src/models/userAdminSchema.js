const  mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs')

const userAdminSchema = mongoose.Schema({

    email: String,
    password: String,
    rooms: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'room'
    }],
    ban: Boolean
}, { versionKey: false });


userAdminSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

userAdminSchema.methods.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.local.password);
}

module.exports = mongoose.model('userAdmin', userAdminSchema);