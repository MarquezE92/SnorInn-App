const { Router } = require('express');
const router = Router();
const express = require('express');
router.use(express.json());
const { findByIdRoom } = require('../controllers/getRoomById');

const routeGetRoomById = async (req, res) => {
    const { id } = req.params
    try {
        const findRoom = await findByIdRoom(id)
        return res.status(200).json(findRoom)
    } catch (error) {
        return res.status(404).send({ error: error.message })
    }
};

module.exports = { routeGetRoomById };
