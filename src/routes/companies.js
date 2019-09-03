const express = require('express');
const Company = require('../models/company');

const router = express.Router();

router.get('/', (req, res) => {
  Company.find()
    .populate('owner')
    .exec((err, companies) => {
      if (err) return res.status(500).send(err);
      res.json(companies);
    });
});

router.post("/create", (req, res) => {
  Company.create(req.body, (err, newCompany) => {
    if (err) return res.status(500).send(err);
    res.json(newCompany);
  });
});

router.delete('/remove/:companyId', (req, res) => {
  Company.findByIdAndRemove(req.params.companyId, (err, company) => {
    if (err) return res.status(500).send(err);
    const response = {
      message: "Company successfully deleted",
      id: company._id
    };
    return res.status(200).send(response);
  })
});

module.exports = router;