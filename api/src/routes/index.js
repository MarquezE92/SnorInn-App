const { Router } = require('express');
const router = Router();
const axios = require('axios');

//CONDIFURAR LAS RUTAS


router.get('/', async (req, res) => {
    try {
        return res.status(200).send('TERMINE EL BACK PAPAAAAAAAAAAAA')
    } catch (error) {
        return res.status(404).send({error: 'xd casi'})
    }
});

module.exports = router;
