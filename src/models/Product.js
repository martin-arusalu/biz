import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: String,
});

const Product = mongoose.model('Product', ProductSchema);

export default Product;