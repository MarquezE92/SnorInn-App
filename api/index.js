const mongoose = require('mongoose')
const express = require('express');
const routes = require('./src/routes/index');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');

// INICIALIZACION
const app = express();

// CONFIGURACION DE PUERTO
app.set('port', process.env.PORT || 3002)
app.name = 'API'; 

// CONSTANTE STING DE ATLAS
//const url = `mongodb+srv://SnorInn:SnorInn123@snorinn.zjmulm3.mongodb.net/?retryWrites=true&w=majority`;
const url = `mongodb+srv://SnorInn:SnorInn123@snorinn.zjmulm3.mongodb.net/SnorInn`

// UNION DE MONGODB CON LA APLICACION
const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true 
}
mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to the database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. n${err}`);
    })


 //RUTAS
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(morgan('dev'));
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


// SERVIDOR ESCUCHANDO EN 
app.listen(app.get('port'), () => {
    console.log("SnorInn listening at", app.get('port'))

})
    