// Aca en este archivo deberian ir las tablas relacionales y los pedidos a Sequilize en el PI, 
// pero al ser una DB de ATLAS en la Nube, no se necesita completar ya que el pedido es en index.js

const UserAdmin = require('./models/userAdminSchema')
const ReviewsUser = require('./models/userReviewSchema')
const Reservation = require('./models/reservationSchema')
const roomSchema = require('./models/roomSchema')
const UserClient = require('./models/userClientSchema')
const ReviewRoom = require('./models/roomReviewsSchema')

module.exports = {
    UserAdmin,
    ReviewsUser,
    roomSchema,
    UserClient,
    Reservation,
    ReviewRoom
}