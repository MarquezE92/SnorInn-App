const mongoose = require('mongoose')
const User = require('./User')
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/SnorInn', {useMongoClient: true})
const db = mongoose.connection

db.on('error', function(err){
  console.log('connection error', err)
})

db.once('open', function(){
  console.log('Connection to DB successful')
})