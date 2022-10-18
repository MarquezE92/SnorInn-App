const UserClient = require('../models/userClientSchema');
const UserAdmin = require('../models/userAdminSchema');
const { v4: uuidv4 } = require('uuid');
const { getToken, getTokenR, getTokenRData, getTokenData } = require('../config/jwt.config');
const { getTemplate, getTemplateR, getTemplatePass, getTemplatePayment, getTemplateAdmin, getTemplateRadmin,
    sendEmail, sendRecoverEmail, sendNewPasswordEmail, sendEmailReceipt } = require('../config/mail.config');

const { Router } = require('express');
const router = Router();
const axios = require('axios');
// const { getRoomsbyFilters } = require('./getRoomByQueryR')
const express = require('express')
const Stripe = require('stripe');
const cors = require('cors'); // Exporta libreria para que no haya conflictos entre los puertos del FRONTEND y BACKEND
const { getRooms, findByIdRoom } = require('../controllers')
const { getRoomsbyFilters } = require('../controllers/getRoomByQueryC')
const filtersByQuery = require('../controllers/filtersByQuery')
const { getName } = require('../controllers/getNameQuery')
const { getAllRooms } = require('../controllers/getAllRooms')
const { sortByPrice } = require('../controllers/orderByPrice')
const { sortByRating } = require('../controllers/orderByRating')
//const { deleteRoom } = require('../controllers/deleteById');
const { roomSchema } = require('../db');
//const { putRoom } = require('../controllers/putRoomById');
//const { addResrevation } = require('../controllers/postReservation');
//const { getRoomsByUserAdmin } = require('../controllers/getRoomByAdminId');
//const { addFavorites } = require('../controllers/postFavorites');
//const { getUserClient } = require('../controllers/getUserClient');
//const { getReservationByRoom } = require('../controllers/getReservationByRoom');
const { routePostReview } = require('../routes/postReviews');
const { routeDelFavorites } = require('../routes/delFavorites');
const { routePostRooms } = require('../routes/postRooms');
const { routeGetRoomById } = require('../routes/getRoomById');
const { routeDeleteRoomById } = require('../routes/deleteRoom');
const { routePutRoomById } = require('../routes/putRoomById');
const { routePostReservation } = require('../routes/postReservation')
const { routeGetRoomByIdAdmin } = require('../routes/getRoomByAdminId');
const { routeGetUserClient } = require('../routes/getUserClient');
const { routePostFavorites } = require('../routes/postFavorites');
const { routeGetResrevationByRommId } = require('../routes/getReservationByIdRoom');
const { routeGetReservationById } = require('../routes/getReservationbyId')

router.get('/room/:id', routeGetRoomById);
router.get('/roomsByAdminId/:id', routeGetRoomByIdAdmin);
router.get('/userClient/:id', routeGetUserClient);
router.get('/reservationByRoomId/:id', routeGetResrevationByRommId);
router.get('/reservationById/:id', routeGetReservationById)
router.post('/reviewsByClient', routePostReview);
router.post('/rooms/:idAdmin', routePostRooms);
router.post('/reservation', routePostReservation);
router.post('/favorites', routePostFavorites);
router.put("/rooms/:id", routePutRoomById);
router.put('/favoriteByIdRoom', routeDelFavorites);
router.delete('/room/:id', routeDeleteRoomById);


//CONFIGURAR LAS RUTAS


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

router.get('/allRooms', async (req, res) => {
    try {
        const { name } = req.query
        if (name) {
            console.log(name)
            const one = await roomSchema.find({ name: { $regex: name, $options: 'i' } })
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


// STRIPE KEY PRIVATE
const stripe = new Stripe(process.env.STRIP)
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

        //obtengo el link de la factura
        const url = paymentData.charges.data[0].receipt_url;

        //plantilla del cuerpo del email
        const template = getTemplatePayment(url);

        //envío de mail
        await sendEmailReceipt(email, 'SnorInn reservation receipt', template);

        return res.status(200).send(paymentData)


    } catch (error) {
        console.log(error)
        res.status(404).json({ message: error.raw.message })
    }
});

///////////////////////////////////// RUTAS LOGIN AND REGISTER USER  ///////////////////////////////

//login con verificación de cuenta activada por mail || LOGIN GOOGLE
router.post('/login', async (req, res) => {
    try {
        //obtengo nombre e email del usuario
        const { email, password = p, google } = req.body;

        //verificar que el usuario exista
        let user = await UserClient.findOne({ email }).populate(["roomFavorites", "reservationId"]) || null;

        if (!google) {
        
        if (user === null) {
            return res.status(401).send('You Need to be registered to log in')
        };
        if (user.status !== 'Active') {
            return res.status(401).send('Pending Account. Please Verify Your Email!');
        };
        user.isCorrectPassword(password, (err, result) => {
            if (!result) return res.status(401).send('Invalid password');

            else {
                console.log(user);
                return res.json(user);
            }
        })
    } else {
        if(user === null) {
            user = new UserClient({ email, password: p});
            user.save()
        }
        return res.json(user)
    }

    } catch (error) {
        console.log(error)
        res.status(500).send('Login failed')
    }

})

//ruta registro con mail
router.post('/signup', async (req, res) => {
    try {
        //obtengo nombre e email del usuario
        const { email, password } = req.body;
        //verificar que el usuario aún no exista
        let user = await UserClient.findOne({ email }) || null;
        if (user !== null) {
            return res.status(401).send('You already have an account, cant register twice')
        };
        //Generar el código para verificar el email
        const confirmationCode = uuidv4();

        //crear nuevo usuario
        user = new UserClient({ email, password, confirmationCode });
        //Generar un token
        const token = getToken({ email, password, confirmationCode });
        //Obtener un template
        const template = getTemplate(token);
        //Enviar el email
        await sendEmail(email, 'SnorInn confirmation mail', template);
        //guardar el usuario
        await user.save();

        res.send(user);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
});

//Ruta de confirmación de usuario 
router.get('/confirm/:token', async (req, res) => {
    try {

        // Obtener el token
        const { token } = req.params;

        // Verificar la data
        const data = await getTokenData(token);

        if (data === null) {
            return res.status(500).send('Error at getting data');
        }

        console.log(data);

        const { email, confirmationCode } = data.data;

        // Verificar existencia del usuario
        const user = await UserClient.findOne({ email }) || null;

        if (user === null) {
            return res.status(404).send('This User does not exist');
        }

        // Verificar el código
        if (confirmationCode !== user.confirmationCode) {
            return res.status(500).send('Confirmation Code error');
        }

        // Actualizar usuario
        user.status = 'Active';
        await user.save();

        // Redireccionar a la confirmación-
        return res.redirect('https://snor-inn.vercel.app/confirmedaccount');

    } catch (error) {
        console.log(error);
        return res.send("User couldn't be confirmed");
    }
});

///////////////////////////////////// RUTAS LOGIN AND REGISTER ADMIN  ////////////////////////////////

// ruta login con verificación de cuenta activada por mail 
router.post('/loginadmin', async (req, res) => {
    try {
        //obtengo nombre e email del usuario
        const { email, password } = req.body;
        //verificar que el usuario exista
        const user = await UserAdmin.findOne({ email }).populate("rooms") || null;
        if (user === null) {
            return res.status(401).send('You Need to be registered to log in')
        };
        if (user.status !== 'Active') {
            return res.status(401).send('Pending Account. Please Verify Your Email!');
        };
        //autenticación contraseña
        user.isCorrectPassword(password, (err, result) => {
            if (!result) return res.status(401).send('Invalid password');

            else {
                //                console.log(user);
                res.json(user);
            }
        })

    } catch (error) {
        console.log(error)
        res.status(500).send('Login failed')
    }

})

//ruta registro con mail
router.post('/signupadmin', async (req, res) => {
    try {
        //obtengo nombre e email del usuario
        const { email, password } = req.body;
        //verificar que el usuario aún no exista
        let user = await UserAdmin.findOne({ email }) || null;
        if (user !== null) {
            return res.status(401).send('You already have an account, cant register twice')
        };
        //Generar el código para verificar el email
        const confirmationCode = uuidv4();

        //crear nuevo usuario
        user = new UserAdmin({ email, password, confirmationCode });
        //Generar un token
        const token = getToken({ email, password, confirmationCode });
        //Obtener un template
        const template = getTemplateAdmin(token);
        //Enviar el email
        await sendEmail(email, 'SnorInn confirmation mail', template);
        //guardar el usuario
        await user.save();

        res.send(user);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
});

//Ruta de confirmación de usuario Admin 
router.get('/confirma/:token', async (req, res) => {
    try {

        // Obtener el token
        const { token } = req.params;

        // Verificar la data
        const data = await getTokenData(token);

        if (data === null) {
            return res.status(500).send('Error at getting data');
        }

        console.log(data);

        const { email, confirmationCode } = data.data;

        // Verificar existencia del usuario
        const user = await UserAdmin.findOne({ email }) || null;

        if (user === null) {
            return res.status(404).send('This User does not exist');
        }

        // Verificar el código
        if (confirmationCode !== user.confirmationCode) {
            return res.status(500).send('Confirmation Code error');
        }

        // Actualizar usuario
        user.status = 'Active';
        await user.save();

        // Redireccionar a la confirmación
        return res.redirect('https://snor-inn.vercel.app/confirmedaccount');

    } catch (error) {
        console.log(error);
        return res.send("User couldn't be confirmed");
    }
});

///////////////////////////////////// RUTAS DE RECUPERO DE CONTRASEÑA VIA MAIL USER ////////////////////////

//endpoint para 'Me olvidé la contraseña'
router.post('/forgotPassword', async (req, res) => {

    try {//obtengo dirección de mail a donde enviar el mensaje de recupero
        const { email } = req.body;

        // Verificar existencia del usuario
        const user = await UserClient.findOne({ email }) || null;

        if (user === null) {
            return res.status(404).send('This User does not exist');
        }

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
        const { token } = req.params;

        // Verificar la data
        const data = await getTokenRData(token);

        if (data === null) {
            return res.send('Error at getting data');
        }

        console.log(data);

        const email = data.data;

        console.log(email)

        // Verificar existencia del usuario
        const user = await UserClient.findOne({ email }) || null;

        if (user === null) {
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

        return res.redirect('https://snor-inn.vercel.app/paswordsent');

    } catch (error) {
        console.log(error);
        return res.send("We couldn't reset your password");
    }
});

///////////////////////////////////// RUTAS DE RECUPERO DE CONTRASEÑA VIA MAIL ADMIN //////////////////////////

//endpoint para 'Me olvidé la contraseña'
router.post('/forgotPasswordadmin', async (req, res) => {

    try {//obtengo dirección de mail a donde enviar el mensaje de recupero
        const { email } = req.body;

        // Verificar existencia del usuario
        const user = await UserAdmin.findOne({ email }) || null;

        if (user === null) {
            return res.status(404).send('This User does not exist');
        }

        // Generar un token, válido por una hora, para tokenizar la info del usuario
        const token = getTokenR(email);

        //Obtener un template
        const template = getTemplateRadmin(token);

        //envío mail
        await sendRecoverEmail(email, 'SnorInn recover password', template);

        res.send('Password recovery mail sent')
    } catch (error) {
        console.log(error);
        res.status(500).send('Delivery of recovering password failed')
    }
})

//ruta cambio de contraseña
router.get('/reseta/:token', async (req, res) => {
    try {

        // Obtener el token
        const { token } = req.params;

        // Verificar la data
        const data = await getTokenRData(token);

        if (data === null) {
            return res.send('Error at getting data');
        }

        console.log(data);

        const email = data.data;

        console.log(email)

        // Verificar existencia del usuario
        const user = await UserAdmin.findOne({ email }) || null;

        if (user === null) {
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

        return res.redirect('https://snor-inn.vercel.app/paswordsent');

    } catch (error) {
        console.log(error);
        return res.send("We couldn't reset your password");
    }
});




///////////////////////////////////// RUTA FILTRO NUMERO DE CAMAS Y PLACE ///////////////////////////////////////////

module.exports = router;