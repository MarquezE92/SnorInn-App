const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRound = 10;


const userClientSchema = mongoose.Schema({

    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        //    required: true,
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
    token: { type: String },
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