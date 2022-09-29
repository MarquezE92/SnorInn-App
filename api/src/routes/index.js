const { Router } = require('express');
const router = Router();
const axios = require('axios');
const { getRooms, addRooms } = require('../controllers')
//CONDIFURAR LAS RUTAS


router.get('/rooms', async (req, res) => {
    try {
        const add = await addRooms()
        console.log(add)
        const response = await getRooms()
        return res.status(200).send(response)
    } catch (error) {
        return res.status(404).send({error: 'xd casi'})
    }
});

module.exports = router;
