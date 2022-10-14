const { Router } = require('express');
const router = Router();
const express = require('express');
router.use(express.json());
const { addFavorites } = require('../controllers/postFavorites');

const routePostFavorites = async (req, res) => {
    const { roomFavorites, idClient } = req.body
    try {
        const postFavorites = await addFavorites(roomFavorites, idClient)
        return res.status(200).send(postFavorites)

    } catch (error) {
        return res.status(404).send({ error: error.message })
    }
};

module.exports = { routePostFavorites };