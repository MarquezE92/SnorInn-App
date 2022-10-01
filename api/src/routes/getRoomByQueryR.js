const { Router } = require('express');
const router = Router();
const {getRoomsbyFilters} = require('../controllers/getRoomByQueryC');
const express = require('express');
router.use(express.json());

const getRoomFilter = async (req, res) => {
    const { place } = req.query
    try {
        const response = await getRoomsbyFilters(place)
        return res.status(200).send(response)

    } catch (error) {
        return res.status(404).send({error: 'that room does not exist'})
    }
};

module.exports = getRoomFilter;
