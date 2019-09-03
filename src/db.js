import mongoose from 'mongoose';
import env from './config';

function initDb() {
  mongoose.connect(env.dbUrl)
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
}

module.exports = initDb;