const { Router } = require('express');
const { findOne } = require('../models/userClientSchema');
const userClientSchema = require('../models/userClientSchema');
const router = Router();
const CryptoJS = require('crypto-js')


router.post('/prueba1', async (req, res) => {
    console.log(req.body)
    const newUser = new userClientSchema({
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, 'frase secreata del dot.ev').toString(),
    });
    try {
        const savedUser = await newUser.save()
        res.send('the usser was succesfully created')
        console.log(savedUser)
    } catch (error) {
        res.send({ error: error.message })
    }

})

router.post('/prueba2', async (req, res) => {
    const { email, password } = req.body
    try {
        await userClientSchema.find({ email }, (err, user) => {
            if (err) {
                res.status(500).send('Error conencting with the email')
            } else if (!user) {
                res.status(500).send('Error the email does not exist')
            } else {
                user.isCorrectPassword(password, (err, result) => {
                    if (err) {
                        res.status(500).send('Error conencting with the password')
                    } else if (result) {
                        res.status(200).send('User conected')
                    } else {
                        res.status(500).send('password or email incorrect')
                    }
                })
            }
        })
    } catch (error) {
        res.send({ error: error.message })
    }

})



module.exports = router;