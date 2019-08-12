import express from 'express';
import Product from '../models/Product';

const router = express.Router();

router.get('/', (req, res) => {
  Product.find()
    .exec((err, products) => {
      if (err) return res.status(500).send(err);
      res.json(products);
    });
});

router.post("/create", (req, res) => {
  Product.create(req.body, (err, newProduct) => {
    if (err) return res.status(500).send(err);
    res.json(newProduct);
  });
});

router.delete('/remove/:productId', (req, res) => {
  Product.findByIdAndRemove(req.params.productId, (err, product) => {
    if (err) return res.status(500).send(err);
    const response = {
      message: "Product successfully deleted",
      id: product._id
    };
    return res.status(200).send(response);
  })
});

module.exports = router;