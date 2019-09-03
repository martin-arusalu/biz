const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompanyProductSchema = new Schema({
  company: { type: Schema.Types.ObjectId, ref: 'Company' },
  product: { type: Schema.Types.ObjectId, ref: 'Product' },
  quality: Number
});

module.exports = mongoose.model('CompanyProduct', CompanyProductSchema);