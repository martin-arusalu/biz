import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import env from './config';
import bodyParser from 'body-parser';
import usersRoutes from './routes/users';
import companiesRoutes from './routes/companies';
import productsRoutes from './routes/products';
import productEntitiesRoutes from './routes/product-entities';
import ProductEntity from './models/ProductEntity';
import Product from './models/Product';
import Company from './models/Company';
import User from './models/User';

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


  app.get("/reset-with-test", async (req, res) => {
    // clear
    ProductEntity.deleteMany();
    Product.deleteMany();
    Company.deleteMany();
    User.deleteMany();

    // create
    const user = await User.create({ name: 'kalle', password: 'password'});
    const company = await Company.create({ owner: user._id, name: 'Test company' });
    const product = await Product.create({ name: 'Lemon water' });
    const companyProduct = await ProductEntity.create({ company: company._id, product: product._id, quality: 50 });

    console.log(companyProduct);

    res.send('ok');
  });

  app.listen(env.port, () => console.log(`Visit ${env.url}:${env.port}`));
});