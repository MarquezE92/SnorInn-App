require('dotenv').config();
const jwt = require('jsonwebtoken');
const {
  SECRET
} = process.env;


const getToken = (payload) => {
    return jwt.sign({
        data: payload
    }, SECRET, { expiresIn: '2h' });
}

const getTokenData = (token) => {
    let data = null;
    jwt.verify(token, SECRET, (err, decoded) => {
        if(err) {
            console.log('Error at getting data from token');
        } else {
            data = decoded;
        }
    });

    return data;
}

const getTokenR = (email) => {
    return jwt.sign({
        data: email
    }, SECRET, { expiresIn: '1h' });
};

const getTokenRData = (token) => {
    let data = null;
    jwt.verify(token, SECRET, (err, decoded) => {
        if(err) {
            console.log('Error at getting data from token');
        } else {
            data = decoded;
        }
    });

    return data;
};

///////////////////////////////////  ADMIN ////////////////////////////////////////////////

const getTokenAdmin = (payload) => {
    return jwt.sign({
        data: payload
    }, SECRET, { expiresIn: '2h' });
};


module.exports = {
    getToken,
    getTokenData,
    getTokenR,
    getTokenRData,
    getTokenAdmin   
}