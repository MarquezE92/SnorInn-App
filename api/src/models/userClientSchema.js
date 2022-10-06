const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs')

const userClientSchema = mongoose.Schema({
    //  local:{
    email: String,
    password: String,
    //-----------------Para tener un atributo que refleje el estado de la confirmación de registro via mail
    status: {
        type: String,
        enum: ['Pending', 'Active'],
        default: 'Pending'
    },
    //--------------------------Para guardar el código que identifique la confirmación del registro
    confirmationCode: {
        type: String,
        unique: true
    },
    // },
    /* facebook:{
         email: String,
         password: String,
         id: String,
         token: String
     },
     google: {
         email: String,
         password: String,
         id: String,
         token: String*/
    // }
    // username: String,
    // password: String,
    // firstname: String,
    // lasrname: String,
    // age: Number,
    // email: String,
    // address: String,
    // rating: Number,
    reservationId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reservation'
    }],
    favorites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'room'
    }]

}, { versionKey: false });
userClientSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

userClientSchema.methods.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.local.password);
}


module.exports = mongoose.model('UserClient', userClientSchema);