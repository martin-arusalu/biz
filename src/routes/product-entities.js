import express from 'express';
import ProductEntity from '../models/ProductEntity';

const router = express.Router();

router.get('/', (req, res) => {
  ProductEntity.find()
    .populate('company')
    .populate('product')
    .exec((err, products) => {
      if (err) return res.status(500).send(err);
      res.json(products);
    });
});

router.post("/create", (req, res) => {
  const product = req.body;
  product.quality = Math.floor(Math.random() * 100);
  
  ProductEntity.create(product, (err, newProduct) => {
    if (err) return res.status(500).send(err);
    res.json(newProduct);
  });
});

router.delete('/remove/:productEntityId', (req, res) => {
  ProductEntity.findByIdAndRemove(req.params.productEntityId, (err, product) => {
    if (err) return res.status(500).send(err);
    const response = {
      message: "Product entity successfully deleted",
      id: product._id
    };
    return res.status(200).send(response);
  })
});


module.exports = router;