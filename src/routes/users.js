const router = require('express').Router();
const { getUser } = require('../controllers/users');

router.get('/profile', getUser);

module.exports = router;