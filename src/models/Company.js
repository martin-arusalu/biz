import mongoose from 'mongoose';

const CompanySchema = new mongoose.Schema({
  name: String,
});

const Company = mongoose.model('Company', CompanySchema);

export default Company;