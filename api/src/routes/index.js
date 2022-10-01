const { Router } = require('express');
const router = Router();
const axios = require('axios');
const { getRooms, addRooms,findByIdRoom } = require('../controllers')
const express = require('express')
router.use(express.json())
const getRoomsFindByPlace = require('../routes/getRoomByQueryR')
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
    const {type, place, n_beds, price, availability, rating, photos, services} = req.body
    // console.log(photos)
    try {
        const postRoom = await addRooms(req.body)
        return res.send(postRoom)

    } catch (error) {
        return res.status(404).send({ error: ' We are sorry, we couldnt insert data in Data Base' })
    }
})

router.get('/rooms/:id', async (req, res) => {
    const id  = req.params.id
    console.log (id)
    try {
        const findRoom = await findByIdRoom(req.params.id)
        return res.status(200).send(findRoom)
    } catch (error) {
        return res.status(404).send({error: 'We are sorry, we couldnt find the room'})
    }
});

router.get('/findName', getRoomsFindByPlace)

module.exports = router;
