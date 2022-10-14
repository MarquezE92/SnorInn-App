const { Router } = require('express');
const router = Router();
const express = require('express');
router.use(express.json());

const getRooms = async (page) => {
    const response = await roomSchema.paginate({}, { limit: 6, page: page })
    return response
}

module.exports = {
    getRooms
}