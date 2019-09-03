import CompanyProduct from '../models/company-product';
import Product from '../models/product';
import Company from '../models/company';
import User from '../models/user';
import users from '../../data/users.json';

async function resetTest(req, res) {
  // clear
  await CompanyProduct.deleteMany({}, () => {});
  await Product.deleteMany({}, () => {});
  await Company.deleteMany({}, () => {});
  await User.deleteMany({}, () => {});

  // create
  // const dbUsers = await Promise.all(users.map(User.create));
  // const dbCompanies = await Promise.all(companies.map(Company.create));
  // const company1 = await Company.create({ owner: user1._id, name: 'Test company1', reputation: 50, money: 1000 });
  // const company2 = await Company.create({ owner: user1._id, name: 'Test company2', reputation: 50, money: 1000 });
  // const company3 = await Company.create({ owner: user2._id, name: 'Test company3', reputation: 50, money: 1000 });
  // const product = await Product.create({ name: 'Lemon water' });
  // const companyProduct1 = await CompanyProduct.create({ company: company1._id, product: product._id, quality: 50 });
  // const companyProduct2 = await CompanyProduct.create({ company: company1._id, product: product._id, quality: 50 });
  // const companyProduct3 = await CompanyProduct.create({ company: company1._id, product: product._id, quality: 50 });
  // const companyProduct4 = await CompanyProduct.create({ company: company2._id, product: product._id, quality: 50 });
  // const companyProduct5 = await CompanyProduct.create({ company: company2._id, product: product._id, quality: 50 });

  res.send('ok');
}


module.exports = {
  resetTest
}