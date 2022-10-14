const { Router } = require('express');
const router = Router();
const express = require('express');
router.use(express.json());
const { addResrevation } = require('../controllers/postReservation');

const routePostReservation = async (req, res) => {
    const { userId, roomId, check_in, check_out, totalPrice } = req.body
    try {
        const postReservation = await addResrevation(req.body)
        return res.status(200).send(postReservation)

    } catch (error) {
        return res.status(404).send({ error: error.message })
    }
};

module.exports = {routePostReservation}