const { Router } = require('express');
const router = Router();
const axios = require('axios');
const { getRooms, addRooms, findByIdRoom } = require('../controllers')
// const { getRoomsbyFilters } = require('./getRoomByQueryR')
const express = require('express')
router.use(express.json())
const { getRoomsbyFilters } = require('../controllers/getRoomByQueryC')
const filtersByQuery = require('../controllers/filtersByQuery')
const { getName } = require('../controllers/getNameQuery')
const { getAllRooms } = require('../controllers/getAllRooms')
const {sortByPrice} = require('../controllers/orderByPrice')
//CONDIFURAR LAS RUTAS


router.get('/rooms', async (req, res) => { //esta va solo por paginado y asigando por query la pagina a permanecer
    const page = parseInt(req.query.page) || 1
    const { type, name, n_beds } = req.query
    try {
        if (type || name || n_beds) {
            let filterResult = await filtersByQuery(null, name, n_beds, type, page)
            if (!filterResult.totalDocs) return res.status(404).send({ error: 'that place does not exist' })
            return res.status(200).send(filterResult)
        }
        const response = await getRooms(page)
        return res.status(200).send(response)
    } catch (error) {
        return res.status(404).send({ error: error.message })
    }
});

router.get('/rooms/:place', async (req, res) => { // esta va atener el filtro de atributo
    const place = req.params.place
    const page = parseInt(req.query.page) || 1
    const { type, name, n_beds } = req.query

    try {
        if (type || name || n_beds) {
            let filterResult = await filtersByQuery(place, name, n_beds, type, page)
            if (!filterResult.totalDocs) return res.status(404).send({ error: 'that place does not exist' })
            return res.status(200).send(filterResult)
        }
        const filter = await getRoomsbyFilters(place, page)
        if (filter.totalDocs) return res.status(200).send(filter)
        return res.status(404).send({ error: 'that place does not exist' })

    } catch (error) {
        return res.status(404).send({ error: error.message })
    }
});

router.get('/find', async (req, res) => {
    const name = req.query.name
    const page = parseInt(req.query.page) || 1
    try {
        const findOne = await getName(name, page)
        return res.send(findOne)
    } catch (error) {
        return res.status(404).send({ error: error.message })
    }
})


router.post('/rooms', async (req, res) => {
    const { type, name, description, place, n_beds, price, availability, rating, photos, services } = req.body
    // console.log(photos)
    try {
        const postRoom = await addRooms(req.body)
        return res.send(postRoom)

    } catch (error) {
        return res.status(404).send({ error: ' We are sorry, we couldnt insert data in Data Base' })
    }
})

router.get('/room/:id', async (req, res) => {
    const id = req.params.id
    console.log(id)
    try {
        const findRoom = await findByIdRoom(req.params.id)
        return res.status(200).send(findRoom)
    } catch (error) {
        return res.status(404).send({ error: 'We are sorry, we couldnt find the room' })
    }
});

router.get('/allRooms', async (req, res) => {
    try {
        const allRooms = await getAllRooms()
        res.status(200).send(allRooms)
    } catch (error) {
        return res.status(404).send({ error: 'We are sorry, we couldnt find the room' })
    }

});
router.get('/orderByPrice', async (req, res) => {
    const page = parseInt(req.query.page) || 1
    const order = req.query.order || 'asc'
    try {
        const orderByPrice = await sortByPrice(page, order)
        res.status(200).send(orderByPrice)
    } catch (error) {
        return res.status(404).send({ error: 'We are sorry, we couldnt find the room' })
    }

});



///////////////////////////////////// RUTA FILTRO NUMERO DE CAMAS Y PLACE ///////////////////////////////////////////

module.exports = router;
