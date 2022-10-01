const { Router } = require('express');
const router = Router();
const axios = require('axios');
const { getRooms, addRooms,findByIdRoom } = require('../controllers')
// const { getRoomsbyFilters } = require('./getRoomByQueryR')
const express = require('express')
router.use(express.json())
const {getRoomsbyFilters} = require('../controllers/getRoomByQueryC')
//CONDIFURAR LAS RUTAS


router.get('/rooms', async (req, res) => {
    const { place } = req.query
    try {
        if(place){
            const filter = await getRoomsbyFilters(place)
            return res.status(200).send(filter)
        } else {
            const response = await getRooms()
            return res.status(200).send(response)
        }
    } catch (error) {
        return res.status(404).send({ error: error.message })
    }
});

router.post('/rooms', async (req, res) => {
    const {type, name, description, place, n_beds, price, availability, rating, photos, services} = req.body
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

// router.get('/findName', getRoomFilter)

module.exports = router;
