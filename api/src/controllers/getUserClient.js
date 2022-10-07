const mongoose = require('mongoose');
const { UserClient } = require('../db');

const getUserClient = async(id) => {
    const getClient = await UserClient.findById(id).populate('roomFavorites')
    return getClient
};

module.exports = {
    getUserClient
}