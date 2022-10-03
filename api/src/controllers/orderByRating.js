const mongoose = require('mongoose');
const { roomSchema } = require('../db');

const sortByRating = async (page, order) => {
    const byPrice = await roomSchema.paginate({}, {limit: 6, page: page , sort: {rating: order}})
    return byPrice

}

module.exports = { sortByRating };