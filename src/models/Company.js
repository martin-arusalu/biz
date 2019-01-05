import mongoose from 'mongoose';

const CompanySchema = new mongoose.Schema({
  name: String,
  owner: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

const Company = mongoose.model('Company', CompanySchema);

export default Company;