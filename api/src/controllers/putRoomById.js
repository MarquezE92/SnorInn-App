const mongoose = require('mongoose');
const { roomSchema } = require('../db');

const putRoom = async (id, body) => {
    const {modificatedRoom} = await roomSchema.findByIdAndUpdate(
        id,
        body,
        { new: false }
      );
    return modificatedRoom

}

module.exports = { putRoom };