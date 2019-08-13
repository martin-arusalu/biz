import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const CompanyProductSchema = new Schema({
  company: { type: Schema.Types.ObjectId, ref: 'Company' },
  product: { type: Schema.Types.ObjectId, ref: 'Product' },
  quality: Number
});

const CompanyProduct = mongoose.model('CompanyProduct', CompanyProductSchema);

export default CompanyProduct;