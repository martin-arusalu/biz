import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import env from './config';
import bodyParser from 'body-parser';
import usersRoutes from './routes/users';
import companiesRoutes from './routes/companies';
import productsRoutes from './routes/products';
import companyProductRoutes from './routes/company-products';
import CompanyProduct from './models/CompanyProduct';
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
  app.use('/company-products', companyProductRoutes);


  app.get("/reset-with-test", async (req, res) => {
    // clear
    await CompanyProduct.deleteMany({}, () => {});
    await Product.deleteMany({}, () => {});
    await Company.deleteMany({}, () => {});
    await User.deleteMany({}, () => {});

    // create
    const user1 = await User.create({ name: 'kalle', password: 'password'});
    const user2 = await User.create({ name: 'malle', password: 'password'});
    const company1 = await Company.create({ owner: user1._id, name: 'Test company1', reputation: 50, money: 1000 });
    const company2 = await Company.create({ owner: user1._id, name: 'Test company2', reputation: 50, money: 1000 });
    const company3 = await Company.create({ owner: user2._id, name: 'Test company3', reputation: 50, money: 1000 });
    const product = await Product.create({ name: 'Lemon water' });
    const companyProduct1 = await CompanyProduct.create({ company: company1._id, product: product._id, quality: 50 });
    const companyProduct2 = await CompanyProduct.create({ company: company1._id, product: product._id, quality: 50 });
    const companyProduct3 = await CompanyProduct.create({ company: company1._id, product: product._id, quality: 50 });
    const companyProduct4 = await CompanyProduct.create({ company: company2._id, product: product._id, quality: 50 });
    const companyProduct5 = await CompanyProduct.create({ company: company2._id, product: product._id, quality: 50 });

    res.send('ok');
  });

  app.listen(env.port, () => console.log(`Visit ${env.url}:${env.port}`));
});