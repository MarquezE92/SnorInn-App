const { Router } = require('express');
const router = Router();
const express = require('express');
router.use(express.json());
const { getRoomsByUserAdmin } = require('../controllers/getRoomByAdminId');

const routeGetRoomByIdAdmin = async (req, res) => {
    const { id } = req.params

    try {
        const findRoomsByAdminId = await getRoomsByUserAdmin(id)
        return res.status(200).send(findRoomsByAdminId)
    } catch (error) {
        return res.status(404).send({ error: error.message })
    }
};

module.exports = {routeGetRoomByIdAdmin};
