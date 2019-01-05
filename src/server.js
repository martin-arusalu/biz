import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import env from './config';

mongoose.connect(env.dbUrl)
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  const app = express()
  app.use(cors())

  app.get('/', (req, res) => res.send('Hello World!'));

  app.listen(env.port, () => console.log(`Visit ${env.url}:${env.port}`));
});

// const Users = db.collection('users');
//     const Companies = db.collection('companies');
//     const Products = db.collection('products');
//     const CompaniesProducts = db.collection('companies_products');