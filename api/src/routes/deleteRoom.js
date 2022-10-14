const { Router } = require('express');
const router = Router();
const express = require('express');
router.use(express.json());
const { deleteRoom } = require('../controllers/deleteById');

const routeDeleteRoomById = async (req, res) => {
    const id = req.params.id
    console.log(id)
    try {
        const findRoom = await deleteRoom(req.params.id)
        return res.status(200).send('The room was deleted')
    } catch (error) {
        return res.status(404).send({ error: 'We are sorry, we couldnt delete the room' })
    }
};

module.exports = {routeDeleteRoomById};