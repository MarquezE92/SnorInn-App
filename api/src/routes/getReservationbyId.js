const { Router } = require('express');
const router = Router();
const express = require('express');
router.use(express.json());
const { getReservation } = require('../controllers/getReservationById');

const routeGetReservationById = async (req, res) => {
    const { id } = req.params;
    try {
        const findIdReservation = await getReservation(id)
        return res.status(200).send(findIdReservation)
    } catch (error) {
        return res.status(404).send({ error: error.message })
    }
};

module.exports = { routeGetReservationById };
