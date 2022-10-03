const mongoose = require('mongoose');
const { roomSchema } = require('../db');

const sortByPrice = async (page, order) => {
    const byPrice = await roomSchema.paginate({}, {limit: 6, page: page , sort: {price: order}})
    return byPrice

}

module.exports = { sortByPrice };