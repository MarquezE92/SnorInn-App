const { Router } = require('express');
const router = Router();
const express = require('express');
router.use(express.json());
const { delFavorite } = require('../controllers/deteleFavorites');

const routeDelFavorites = async (req, res) => {
    const { idClient, roomFavorites } = req.body
    try {
        const delFavotiteOffSchemaUserClient = await delFavorite(idClient, roomFavorites)
        return res.status(200).send(delFavotiteOffSchemaUserClient)
    } catch (error) {
        return res.status(404).send({error: error.message})
    }
};

module.exports = { routeDelFavorites }
