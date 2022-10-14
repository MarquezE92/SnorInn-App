const { Router } = require('express');
const router = Router();
const express = require('express');
router.use(express.json());
const { getUserClient } = require('../controllers/getUserClient');

const routeGetUserClient = async (req, res) => {
    const { id } = req.params;
    try {
        const dataClient = await getUserClient(id)
        return res.status(200).json(dataClient)
    } catch (error) {
        return res.status(404).send({ error: error.message })
    }
};

module.exports = { routeGetUserClient };