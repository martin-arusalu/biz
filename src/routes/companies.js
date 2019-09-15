const express = require('express');

const { create, remove, getMyCompanies } = require('../controllers/companies');

const router = express.Router();

router.get('/', getMyCompanies);

router.post("/create", create);

router.delete('/remove/:companyId', remove);

module.exports = router;