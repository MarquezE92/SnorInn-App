const mongoose = require ('mongoose');
const { roomSchema, UserClient } = require('../db');

const addFavorites = async (idRoom , idClient) => {
    const getRoom = await roomSchema.findById(idRoom)
    let getClient = await UserClient.findById(idClient)
    console.log(getClient)
    let filerFavorites = getClient.roomFavorites.filter( x => {
        return x.toString() === idRoom
    }) 
    console.log(filerFavorites)
    if (!filerFavorites.length) {
        getClient.roomFavorites = getClient.roomFavorites.concat(idRoom)      
        await getClient.save()
        return getRoom
    }
};

module.exports = {
    addFavorites
}
