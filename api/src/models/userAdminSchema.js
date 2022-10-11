const  mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRound = 10;

const userAdminSchema = mongoose.Schema({

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
         unique: true },
    rooms: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'room'
    }],
    ban: Boolean
}, { versionKey: false });

//autenticación con contraseña hasheada
userAdminSchema.pre('save', function(next){
    if(this.isNew || this.isModified('password')){
        const document = this
        bcrypt.hash(document.password, saltRound, (err,hashedPassword) => {
            if(err){
                next(err);
            } else {
                document.password = hashedPassword;
                next();
            }
        })
    } else{
        next();
    }
});

userAdminSchema.methods.isCorrectPassword = function(password, callback){
    bcrypt.compare(password, this.password, function(err, same){
        if(err){
            callback(err)
        }else{
            callback(err,same)
        }
    })
}

module.exports = mongoose.model('userAdmin', userAdminSchema);