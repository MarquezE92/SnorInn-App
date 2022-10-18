const mongoose = require('mongoose')
const express = require('express');
const routes = require('./src/routes/index');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const passport = require('passport')
const flash = require('connect-flash')
const session = require('express-session')
const Stripe = require('stripe');
const cors = require('cors'); // Exporta libreria para que no haya conflictos entre los puertos del FRONTEND y BACKEND
require("dotenv").config();
// INICIALIZACION
const app = express();

// CONFIGURACION DE PUERTO
app.set('port', process.env.PORT || 3002)
app.name = 'API';

// CONSTANTE STRING DE ATLAS

const url =  process.env.MONGO_STRING

// STRIPE KEY PRIVATE
const stripe = new Stripe(process.env.STRIPE)

// UNION DE MONGODB CON LA APLICACION
const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
mongoose.connect(url, connectionParams)
    .then(() => {
        console.log('Connected to the database ')
    })
    .catch((err) => {
        console.error(`Error connecting to the database. n${err}`);
    })


//MIDDLEWARES
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(session({
    secret: 'SistemOfSnorInn',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
app.use('/', routes);
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    res.status(status).send(message);
});
app.use(cors({origin: 'http://localhost:3000'}));


// SERVIDOR ESCUCHANDO EN 
app.listen(app.get('port'), () => {
    console.log("SnorInn listening at", app.get('port'))

})
