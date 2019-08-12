import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import env from './config';
import bodyParser from 'body-parser';
import usersRoutes from './routes/users';
import companiesRoutes from './routes/companies';
import productsRoutes from './routes/products';
import productEntitiesRoutes from './routes/product-entities';

mongoose.connect(env.dbUrl)
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  const app = express()
  app.use(cors())
  app.use(bodyParser.json())

  app.get('/', (req, res) => res.send('Hi!'));

  app.use('/users', usersRoutes);
  app.use('/companies', companiesRoutes);
  app.use('/products', productsRoutes);
  app.use('/product-entities', productEntitiesRoutes);

  app.listen(env.port, () => console.log(`Visit ${env.url}:${env.port}`));
});