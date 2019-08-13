import mongoose from 'mongoose';
import env from './config';
import CompanyProduct from './models/CompanyProduct';
import Product from './models/Product';
import Company from './models/Company';
import User from './models/User';

mongoose.connect(env.dbUrl)
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('opeeen');
  setInterval(() => {
    CompanyProduct
      .find()
      .populate('company')
      .exec((err, res) => {
        res.forEach(async product => {
          if (Math.random() > 0.9) {
            const comp = await Company.findById(product.company._id);
            console.log(comp);
            comp.money += 10;
            await comp.save();
            console.log(comp);
            await CompanyProduct.findByIdAndDelete(product._id);
          }
        });
      });
  }, 10000);
});