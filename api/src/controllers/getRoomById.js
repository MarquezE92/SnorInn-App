const { Router } = require('express');
const router = Router();
const express = require('express');
router.use(express.json());
const {roomSchema} = require('../db')

const findByIdRoom = async (id) => {
    const find = await roomSchema.findById(id)
    return find
};

module.exports = {findByIdRoom}