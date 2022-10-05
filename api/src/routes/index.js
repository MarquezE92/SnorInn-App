const { Router } = require('express');
const router = Router();
const axios = require('axios');
const { getRooms, addRooms, findByIdRoom } = require('../controllers')
// const { getRoomsbyFilters } = require('./getRoomByQueryR')
const express = require('express')
router.use(express.json())
const Stripe = require('stripe');
const cors = require('cors'); // Exporta libreria para que no haya conflictos entre los puertos del FRONTEND y BACKEND
const { getRoomsbyFilters } = require('../controllers/getRoomByQueryC')
const filtersByQuery = require('../controllers/filtersByQuery')
const { getName } = require('../controllers/getNameQuery')
const { getAllRooms } = require('../controllers/getAllRooms')
const { sortByPrice } = require('../controllers/orderByPrice')
const { sortByRating } = require('../controllers/orderByRating')
const { deleteRoom } = require('../controllers/deleteById');
const { roomSchema } = require('../db');
const { putRoom } = require('../controllers/putRoomById');
const { addResrevation } = require('../controllers/postReservation');
const { getRoomsByUserAdmin } = require('../controllers/getRoomByAdminId');


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


router.get('/orderByRating', async (req, res) => {
    const page = parseInt(req.query.page) || 1
    const order = req.query.order || 'asc'
    try {
        const orderByRating = await sortByRating(page, order)
        res.status(200).send(orderByRating)
    } catch (error) {
        return res.status(404).send({ error: 'We are sorry, we couldnt find the room' })
    }

});


router.delete('/room/:id', async (req, res) => {
    const id = req.params.id
    console.log(id)
    try {
        const findRoom = await deleteRoom(req.params.id)
        return res.status(200).send('The room was deleted')
    } catch (error) {
        return res.status(404).send({ error: 'We are sorry, we couldnt delete the room' })
    }
});

router.put("/rooms/:id", async (req, res) => {
    const getId = req.params.id
    const body = req.body
    try {
        const roomUpdated = await putRoom(getId, body)
        return res.status(200).send(roomUpdated)
    } catch (error) {
        return res.status(404).send({ error: 'We are sorry, we couldnt update the room' })
    }
  });

// STRIPE KEY PRIVATE
const stripe = new Stripe('sk_test_51LpGDXJjFvmrQ5VMHJn0DT1tfOuKTeIz4fwyW0qd5e1deE4HC3Xkt07y9defbZNttmdg8id3zVNox95Y26L1LKVT00pOXoh4ma')
router.post('/dataPeyment', async (req, res) => {
    const { id, amount } = req.body
    try {
        const paymentData = await stripe.paymentIntents.create({
            amount,
            currency: 'USD',
            //description: "HAbitacion en hotel Luxury",
            payment_method: id,
            confirm: true,
            //succsess_url: 'http://localhost:3002/responsePayment',
            //cancel_url: 'http://localhost:3002/badResponse'
        });
        console.log(paymentData)
        return res.status(200).send({message: 'Succesfull payment' })
        

    } catch (error) {
        res.status(404).json({message: error.raw.message})
    }
});

router.post('/reservation', async (req, res) => {
    const { userId, roomId, check_in, check_out } = req.body
    try {
        const postReservation = await addResrevation(req.body)
        return res.status(200).send(postReservation)

    } catch (error) {
        return res.status(404).send({ error: error.message})
    }
});

router.get('/roomsByAdminId', async (req, res) => {
    //const roomsByAdminId = req.params
    
    try {
        const findRoomsByAdminId = await getRoomsByUserAdmin()
        return res.status(200).send(findRoomsByAdminId)
    } catch (error) {
        return res.status(404).send({ error: error.message})
    }
});



///////////////////////////////////// RUTA FILTRO NUMERO DE CAMAS Y PLACE ///////////////////////////////////////////

module.exports = router;
