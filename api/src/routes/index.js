const UserClient = require('../models/userClientSchema');
const { v4: uuidv4 } = require('uuid');
const {getToken, getTokenR, getTokenRData, getTokenData} = require('../config/jwt.config');
const {getTemplate, getTemplateR,  getTemplatePass, sendEmail, sendRecoverEmail} = require ('../config/mail.config');

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
const { addFavorites } = require('../controllers/postFavorites');
const { getUserClient } = require('../controllers/getUserClient');


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
    try {
        const findOne = await getName(name)
        return res.send(findOne)
    } catch (error) {
        return res.status(404).send({ error: error.message })
    }
});


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
        const {name} = req.query
        if(name){
            const one = await roomSchema.find({name: {$regex: name, $options: 'i'}})
            return res.status(200).send(one)
        }
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
    const { id, amount, email } = req.body
    try {
        const paymentData = await stripe.paymentIntents.create({
            amount,
            currency: 'ARS',
            //description: "HAbitacion en hotel Luxury",
            payment_method: id,
            receipt_email: email,
            confirm: true
            //succsess_url: 'http://localhost:3002/responsePayment',
            //cancel_url: 'http://localhost:3002/badResponse'
        });
        console.log(paymentData)
        return res.status(200).send(paymentData)
        

    } catch (error) {
        res.status(404).json({message: error.raw.message})
    }
});

router.post('/reservation', async (req, res) => {
    const { userId, roomId, check_in, check_out, totalPrice } = req.body
    try {
        const postReservation = await addResrevation(req.body)
        return res.status(200).send(postReservation)

    } catch (error) {
        return res.status(404).send({ error: error.message})
    }
});

router.get('/roomsByAdminId/:id', async (req, res) => {
    const {id} = req.params
    
    try {
        const findRoomsByAdminId = await getRoomsByUserAdmin(id)
        return res.status(200).send(findRoomsByAdminId)
    } catch (error) {
        return res.status(404).send({ error: error.message})
    }
});
///////////////////////////////////// GET DashBorad userClient  ///////////////////////////////
router.get('/userClient/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const dataClient = await getUserClient(id)
        return res.status(200).json(dataClient)
    } catch (error) {
        return res.status(404).send({ error: error.message})
    }
})


///////////////////////////////////// POST DashBorad userClient  ///////////////////////////////

router.post('/favorites', async (req, res) => {
    const { roomFavorites, idClient } = req.body
    try {
        const postFavorites = await addFavorites(roomFavorites, idClient)
        return res.status(200).send(postFavorites)

    } catch (error) {
        return res.status(404).send({ error: error.message})
    }
});


///////////////////////////////////// RUTAS CONFIRMACIÓN VIA MAIL  ///////////////////////////////

//login con verificación de cuenta activada por mail 
router.post('/login', async(req, res)=>{
    try{
    //obtengo nombre e email del usuario
        const {email, password} = req.body;
    //verificar que el usuario exista
        const user = await UserClient.findOne({email}) || null;
        if(user === null) {
            return res.status(401).send('You Need to be registered to log in')
        };
        if(user.status !=='Active') {
            return res.status(401).send('Pending Account. Please Verify Your Email!');
        };
        user.isCorrectPassword(password, (err, result)=>{
            if(!result) return res.status(401).send('Invalid password');
        }) 
        
        res.json(user);
                

    } catch(error){
        console.log(error)
        res.status(500).send('Login failed')
    }

})

//ruta post Email (registro con mail)
router.post('/signup', async (req, res) => {
    try {
        //obtengo nombre e email del usuario
        const {email, password, isAdmin} = req.body;
        //verificar que el usuario aún no exista
        let user = await UserClient.findOne({email}) || null;
        if(user !== null) {
            return res.send('You already have an account, cant register twice')
        };
        //Generar el código para verificar el email
        const confirmationCode = uuidv4();

        //crear nuevo usuario
        user = new UserClient({email, password, isAdmin, confirmationCode});
        //Generar un token
        const token = getToken({email, password, confirmationCode});
        //Obtener un template
        const template = getTemplate(token);
        //Enviar el email
        await sendEmail(email, 'SnorInn confirmation mail', template);
        //guardar el usuario
        await user.save();

        res.send(user);
    } catch (error) {
        console.log(error);
        return res.send('Oops, an error occurred')
    }
});

//Ruta de confirmación de usuario 
router.get('/confirm/:token', async (req, res) => {
    try {

       // Obtener el token
       const { token } = req.params;
       
       // Verificar la data
       const data = await getTokenData(token);

       if(data === null) {
            return res.send('Error at getting data');
       }

       console.log(data);

       const { email, confirmationCode } = data.data;

       // Verificar existencia del usuario
       const user = await UserClient.findOne({ email }) || null;

       if(user === null) {
            return res.send('This User does not exist');
       }

       // Verificar el código
       if(confirmationCode !== user.confirmationCode) {
            return res.redirect('/error.html');
       }

       // Actualizar usuario
       user.status = 'Active';
       await user.save();

       // Redireccionar a la confirmación
       return res.redirect('http://localhost:3000/confirmedaccount');
        
    } catch (error) {
        console.log(error);
        return res.send("User couldn't be confirmed");
    }
});

///////////////////////////////////// RUTAS DE RECUPERO DE CONTRASEÑA VIA MAIL  ////////////////////////

//endpoint para 'Me olvidé la contraseña'
router.post('/forgotPassword', async (req, res)=> {

    try {//obtengo dirección de mail a donde enviar el mensaje de recupero
        const {email} = req.body;
    
        // Verificar existencia del usuario
           const user = await UserClient.findOne({ email }) || null;
    
           if(user === null) {
                return res.status(404).send('This User does not exist');
           }
        //Tomar el anterior password para usarlo como Secreto
            const SECRET = user.password;

        // Generar un token, válido por una hora, para tokenizar la info del usuario
            const token = getTokenR(email);

        //Obtener un template
            const template = getTemplateR(token);

        //envío mail
            await sendRecoverEmail(email, 'SnorInn recover password', template);

        res.send('Password recovery mail sent')
    } catch (error) {
        console.log(error);
        res.status(500).send('Delivery of recovering password failed')
    }
})

//ruta cambio de contraseña
router.get('/reset/:token', async (req, res) => {
    try {

       // Obtener el token
       const { token} = req.params;
       
       // Verificar la data
       const data = await getTokenRData(token);

       if(data === null) {
            return res.send('Error at getting data');
       }

       console.log(data);

       const email = data.data;

       console.log(email)

       // Verificar existencia del usuario
       const user = await UserClient.findOne({ email }) || null;

       if(user === null) {
            return res.send('This User does not exist');
       }

       //Generar nueva password
        const newPass = uuidv4();

       // Actualizar usuario
       user.password = newPass;
       await user.save();

       //Obtener un template
        const template = getTemplatePass(newPass);

       // Envío de mail con los datos de la nueva password
       await sendNewPasswordEmail(email, 'SnorInn new password', template);

       return res.redirect('http://localhost:3000');
        
    } catch (error) {
        console.log(error);
        return res.send("We couldn't reset your password");
    }
});
///////////////////////////////////// RUTA FILTRO NUMERO DE CAMAS Y PLACE ///////////////////////////////////////////

module.exports = router;
