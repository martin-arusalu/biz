import express from 'express';
import User from '../models/User';
import Company from '../models/Company';

const router = express.Router();

router.get('/', (req, res) => {
  User.find()
    .populate('companies')
    .exec((err, users) => {
      if (err) return res.status(500).send(err);
      res.json(users);
    })
});

router.post("/register", (req, res) => {
  User.create({
    name: req.body.name,
    password: req.body.password,
    money: 10000
  }, (err, newUser) => {
    if (err) return res.status(500).send(err);
    res.json(newUser);
  });
});

router.post('/login', (req, res) => {
  User.find({ name: req.body.name, password: req.body.password }, (err, user) => {
    if (err) return res.status(500).send(err);
    if (user && user.length) {
      res.json(user);
    } else {
      res.send(false);
    }
  })
});

router.get('/:userId/companies', (req, res) => {
  Company.find({ owner: req.params.userId }, (err, companies) => {
    if (err) return res.status(500).send(err);
    res.json(companies);
  })
});


module.exports = router;