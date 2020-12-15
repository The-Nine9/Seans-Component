const mongoose = require('mongoose');

const url = 'mongodb://localhost/SDC';

const connect = () => mongoose.connect(url, { useNewUrlParser: true });

const db = mongoose.connection;

module.exports.db = db;
module.exports.connect = connect;