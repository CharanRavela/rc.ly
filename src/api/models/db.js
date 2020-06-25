'use strict'

require('dotenv').config()

var uri = process.env.DB_URL;
const mongoose = require('mongoose');
const db = mongoose.connection;

const startDB = () => {
    mongoose.connect( uri, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
};

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log("Connected to db!");
});

module.exports = {

    startDB: startDB
    
};

require('./models');