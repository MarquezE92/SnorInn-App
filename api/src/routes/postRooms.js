const { Router } = require('express');
const router = Router();
const express = require('express');
router.use(express.json());
const { addRooms } = require('../controllers/postRooms');


const routePostRooms = async (req, res) => {
    // recibo el _id del admin por params
        const {idAdmin} = req.params
        const { type, name, description, place, n_beds, price, availability, rating, photos, services } = req.body
        // console.log(photos)
        try {
            const postRoom = await addRooms(req.body, idAdmin)
            return res.send(postRoom)
    
        } catch (error) {
            console.log(error)
            return res.status(404).send({ error: error.message })
        }
    };

    module.exports ={routePostRooms}