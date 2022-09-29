const { Router } = require('express');
const router = Router();
const axios = require('axios');
const { getRooms, addRooms } = require('../controllers')
const express = require('express')
router.use(express.json())
//CONDIFURAR LAS RUTAS


router.get('/rooms', async (req, res) => {
    try {
        const response = await getRooms()
        return res.status(200).send(response)
    } catch (error) {
        return res.status(404).send({ error: 'xd casi' })
    }
});

router.post('/rooms', async (req, res) => {
    const {type, place, n_beds, price, availability, rating} = req.body
    try {
        const postRoom = await addRooms(type, place, n_beds, price, availability, rating)
        return res.send(postRoom)

    } catch (error) {
        return res.status(404).send({ error: ' We sorry, cant insert data in Data Base' })
    }
})
module.exports = router;
