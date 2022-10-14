const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRound = 10;


const userClientSchema = mongoose.Schema({

    //  local:{
    //isAdmin: {
    //type: Boolean,
    // default: false
    //},
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: false
    },
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


    token: { type: String },
   /* facebook:{
        email: String,
        password: String,
        id: String,
        token: String

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
//----------------------------- Array de habitaciones creadas por el Admin, se agrega temporalmente
    // rooms: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'room'
    // }],
//----------------------------------------------------------
    reservationId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'reservation'
    }],
    roomFavorites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'room'
    }]

}, { versionKey: false });


userClientSchema.pre('save', function (next) {
    if (this.isNew || this.isModified('password')) {
        const document = this
        bcrypt.hash(document.password, saltRound, (err, hashedPassword) => {
            if (err) {
                next(err);
            } else {
                document.password = hashedPassword;
                next();
            }
        })
    } else {
        next();
    }
});

userClientSchema.methods.isCorrectPassword = function (password, callback) {
    bcrypt.compare(password, this.password, function (err, same) {
        if (err) {
            callback(err)
        } else {
            callback(err, same)
        }
    })
}


module.exports = mongoose.model('UserClient', userClientSchema);