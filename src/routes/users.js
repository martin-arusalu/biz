import express from 'express';
import User from '../models/User';

const router = express.Router();

router.get('/', (req, res) => {
  User.find((err, users) => {
    res.json(users);
  })
});

router.post("/register", (req, res) => {
  User.create({
    name: req.body.name,
    password: req.body.password,
    money: 10000
  }, (err, newUser) => {
    res.json(newUser);
  });
});

router.post('/login', (req, res) => {
  User.find({ name: req.body.name, password: req.body.password }, (err, user) => {
    if (user && user.length) {
      res.json(user);
    } else {
      res.send(false);
    }
  })
});


module.exports = router;