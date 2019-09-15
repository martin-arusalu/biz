const ObjectId = require('mongoose').Types.ObjectId;

const Company = require('../models/company');

function getMyCompanies(req, res) {
  Company.find({ user: req.user.id }, (err, companies) => {
    res.json(companies);
  });
}

function create(req, res) {
  const newCompany = new Company({ name: req.body.name });
  newCompany.reputition = 0;
  newCompany.money = 0;
  newCompany.user = ObjectId(req.user.id);
  newCompany.save((err, company) => {
    if (err) return res.status(500).send(err);
    res.json(company);
  });
};

function remove(req, res) {
  Company.findByIdAndRemove(req.params.companyId, (err, company) => {
    if (err) return res.status(500).send(err);
    const response = {
      message: "Company successfully deleted",
      id: company._id
    };
    return res.status(200).send(response);
  })
}

module.exports = {
  create,
  remove,
  getMyCompanies
}