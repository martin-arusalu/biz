const mongoose = require('mongoose');
const { env } = require('./config');

function initDb() {
  mongoose.connect(env.dbUrl)
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
}

module.exports = initDb;