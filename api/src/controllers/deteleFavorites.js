const mongoose = require('mongoose');
const { UserClient } = require('../db');

const delFavorite = async ({idUserClient, roomFavorites}) =>{
    const getIdClient = await UserClient.findById(idUserClient)
    getIdClient.roomFavorites =  getIdClient.roomFavorites.filter(e => {
        return e.toString() !== roomFavorites
    })
    await getIdClient.save()
    return getIdClient
}

module.exports = {delFavorite};