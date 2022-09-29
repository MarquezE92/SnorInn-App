// Aca en este archivo deberian ir las tablas relacionales y los pedidos a Sequilize en el PI, 
// pero al ser una DB de ATLAS en la Nube, no se necesita completar ya que el pedido es en index.js
// const Admin = require('./models/Admin')
// const Reviews = require('./models/Reviews')
// const Reservation = require('./models/Reservation')
const roomSchema = require('./models/roomSchema')
// const User = require('./models/User')

module.exports = {
    // Admin,
    // Reviews,
    roomSchema,
    // User,
    // Reservation
}