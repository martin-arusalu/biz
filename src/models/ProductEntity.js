import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ProductEntitySchema = new Schema({
  company: { type: Schema.Types.ObjectId, ref: 'Company' },
  product: { type: Schema.Types.ObjectId, ref: 'Product' },
  quality: Number
});

const ProductEntity = mongoose.model('ProductEntity', ProductEntitySchema);

export default ProductEntity;