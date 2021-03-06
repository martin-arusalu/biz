const router = require('express').Router();
const CompanyProduct = require('../models/company-product');

router.post("/create", (req, res) => {
  const product = req.body;
  product.quality = Math.floor(Math.random() * 100);
  
  CompanyProduct.create(product, (err, newProduct) => {
    if (err) return res.status(500).send(err);
    res.json(newProduct);
  });
});

router.delete('/remove/:companyProductId', (req, res) => {
  CompanyProduct.findByIdAndRemove(req.params.companyProductId, (err, product) => {
    if (err) return res.status(500).send(err);
    const response = {
      message: "Product entity successfully deleted",
      id: product._id
    };
    return res.status(200).send(response);
  })
});


module.exports = router;