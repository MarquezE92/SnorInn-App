const mongoose = require('mongoose');
const { UserClient, roomSchema } = require('../db');

const delFavorite = async ( idClient, roomFavorites ) =>{
    const getRoom = await roomSchema.findById(roomFavorites)
    const getIdClient = await UserClient.findById(idClient)
    console.log(getIdClient)
    getIdClient.roomFavorites =  getIdClient.roomFavorites.filter(e => {
        return e.toString() !== roomFavorites
    })
    await getIdClient.save()
    return getRoom
}

module.exports = {delFavorite};