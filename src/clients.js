import mongoose from 'mongoose';
import env from './config';
import CompanyProduct from './models/CompanyProduct';
const Product = require('./models/Product');
const Company = require('./models/Company');
const User = require('./models/User');

mongoose.connect(env.dbUrl)
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
  console.log('Database connection open');
  setInterval(() => {
    CompanyProduct
      .find()
      .populate('company')
      .exec((err, res) => {
        res.forEach(async product => {
          if (Math.random() > 0.9) {
            const comp = await Company.findById(product.company._id);
            comp.money += 10;
            await comp.save();
            await CompanyProduct.findByIdAndDelete(product._id);
          }
        });
      });
  }, 10000);
});