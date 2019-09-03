const User = require('../models/user');

function getUser(req, res) {
  const { user } = req;
  User.findById(user.id, (err, user) => {
    res.json(user);
  });
}

module.exports = { getUser };