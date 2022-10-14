const { Router } = require('express');
const router = Router();
const express = require('express');
router.use(express.json());
const {getRoomsbyFilters} = require('../controllers/getRoomByQueryC');

const getRoomFilter = async (req, res) => {
    const { place } = req.query
    try {
        const response = await getRoomsbyFilters(place)
        if(response.length) return res.status(200).send(response)
        return res.status(404).send({error: 'that room does not exist'})

    } catch (error) {
        return res.status(404).send({error: error.message})
    }
};

module.exports = {getRoomFilter};
