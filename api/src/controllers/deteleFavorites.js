const mongoose = require('mongoose');
const { UserClient } = require('../db');

const delFavorite = async ({idClient, idRoom}) =>{
    const getIdClient = await UserClient.findById(idClient)
    getIdClient.roomFavorites =  getIdClient.roomFavorites.filter(e => {
        return e.toString() !== idRoom
    })
    await getIdClient.save()
    return getIdClient
}

module.exports = {delFavorite};