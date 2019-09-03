const router = require('express').Router()
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const secret = 'This is secret';
const jwt = require('jsonwebtoken');

router.post('/register', (req, res) => {
  User.findOne({ emailAddress: req.body.emailAddress }, (err, user) => {
    if (user) {
      let error = 'Email Address Exists in Database.';
      return res.status(400).json(error);
    } else {
      const newUser = new User({
        name: req.body.name,
        emailAddress: req.body.emailAddress,
        password: req.body.password,
        userName: req.body.userName
      });
      bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err;
        bcrypt.hash(newUser.password, salt,
          (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save().then(user => res.json(user))
              .catch(err => res.status(400).json(err));
          });
      });
    }
  });
});

router.post('/login', (req, res) => {
  const userName = req.body.userName;
  const password = req.body.password;
  User.findOne({ userName })
    .then(user => {
      if (!user) {
        let error = 'User not found';
        return res.status(400).json(error);
      }
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            const payload = {
              id: user._id,
              name: user.userName
            };
            jwt.sign(payload, secret, { expiresIn: 36000 },
              (err, token) => {
                if (err) res.status(500)
                  .json({
                    error: "Error signing token",
                    raw: err
                  });
                res.json({
                  success: true,
                  token: `Bearer ${token}`
                });
              });
          } else {
            let error = 'Password is incorrect';
            return res.status(400).json(error);
          }
        });
    });
});

module.exports = router;