const { Router } = require('express');
const app = Router();
module.exports = (app, passport) => {

    app.post('/login', passport.authenticate('local-login', {
        succesRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true
    }));

    app.post('/singup', passport.authenticate('local-singup', {
        succesRedirect: '/profile',
        failureRedirect: '/singup',
        failureFlash: true
    }));

    app.get('/profile', isLoggedIn, (req, res) => {
        res.render('profile', {
            user: req.user
        });
    });


    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    })


    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        return res.redirect('/');
    }
};