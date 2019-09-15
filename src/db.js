const mongoose = require('mongoose');
const { env } = require('./config');

function initDb() {
  mongoose.connect(env.dbUrl, { useNewUrlParser: true });
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.on('connected', () => console.log('Database connection established'))
}

module.exports = initDb;