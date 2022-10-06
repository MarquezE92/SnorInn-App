const mongoose = require('mongoose');
const { UserClient } = require('../db');

const getFavoritesByUserClient = async (id) => {
    const findFavoritesByClient = await UserClient.findById(id).populate('rooms')
    return findFavoritesByClient
};

module.exports = {
    getFavoritesByUserClient
}