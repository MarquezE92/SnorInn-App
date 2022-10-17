const mongoose = require('mongoose');
const { roomSchema } = require('../db')

const findByIdRoom = async (id) => {
    const find = await roomSchema.findById(id).populate('reviews')
    return find
};

module.exports = { findByIdRoom }