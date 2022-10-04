const localStrategy = require('passport-local').Strategy;
const UserClient = require('./src/db')
const UserAdmin = require('./src/db')

module.exports = function (passport) {
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        UserClient.findById(id, function (err, user) {
            done(err, user);
        });
    });

    passport.use('local-singup', new localStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
        function (req, email, password, done) {
            UserClient.findOne({
                'local.email': email, function(err, user) {
                    if (err) { return done(err); }
                    if (user) {
                        return done(null, false, req.flash('singupMessage', 'The email is already taken'))
                    } else {
                        var newUserClient = new UserClient();
                        newUserClient.local.email = email;
                        newUserClient.local.password = newUserClient.generateHash(password);
                        newUserClient.save(function (err) {
                            if (err) { throw err }
                            return done(null, newUserClient);
                        })
                    };
                }
            });
        }));


    passport.use('local-login', new localStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
        function (req, email, password, done) {
            UserClient.findOne({
                'local.email': email, function(err, user) {
                    if (err) { return done(err); }
                    if (!user) {
                        return done(null, false, req.flash('loginMessage', 'No user found'))
                    } else {
                        if (!user.validatePassword(password)) {
                            return done(null, false, req.flash('loginMessage', 'Wrong password'))
                        }
                        return done(null, user);
                    };
                }
            });
        }));
};
