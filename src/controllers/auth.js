const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { secret } = require('../config');

function register(req, res) {
  User.findOne({ username: req.body.username }, (err, user) => {
    if (user) {
      let error = 'Username Exists in Database.';
      return res.status(400).json(error);
    } else {
      const newUser = new User({
        email: req.body.email,
        password: req.body.password,
        username: req.body.username,
        money: 4000
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
}

function login(req, res) {
  const username = req.body.username;
  const password = req.body.password;
  User.findOne({ username })
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
              name: user.username,
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
}

module.exports = { login, register }