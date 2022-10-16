const { Router } = require('express');
const router = Router();
const express = require('express');
router.use(express.json());
const { getReservationByRoom } = require('../controllers/getReservationByRoom');


const routeGetResrevationByRommId = async (req, res) => {
    const { id } = req.params
    try {
        const findRoomsByReservationId = await getReservationByRoom(id)
        return res.status(200).send(findRoomsByReservationId)
    } catch (error) {
        return res.status(404).send({ error: error.message })
    }
};

module.exports = { routeGetResrevationByRommId };