const { Router } = require('express');
const router = Router();
const express = require('express');
router.use(express.json());
const { findByIdRoom } = require('../controllers/getRoomById');

const routeGetRoomById = async (req, res) => {
    const id = req.params.id
    console.log(id)
    try {
        const findRoom = await findByIdRoom(req.params.id)
        return res.status(200).send(findRoom)
    } catch (error) {
        return res.status(404).send({ error: 'We are sorry, we couldnt find the room' })
    }
};

module.exports = {routeGetRoomById};
