import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
  name: String,
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
});

const Company = mongoose.model('Company', CompanySchema);

export default Company;