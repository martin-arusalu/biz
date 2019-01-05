'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _User = require('./models/User');

var _User2 = _interopRequireDefault(_User);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var URL = 'http://localhost';
var PORT = 3001;
var MONGO_URL = 'mongodb://admin:Testimiseks1@ds125181.mlab.com:25181/biz';

_mongoose2.default.connect(MONGO_URL);
var db = _mongoose2.default.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  var app = (0, _express2.default)();
  app.use((0, _cors2.default)());
  app.listen(PORT, function () {
    console.log('Visit ' + URL + ':' + PORT);
    var newUser = new _User2.default({ name: 'Apple', password: 'Passw0rd' });
    newUser.save(function (err, user) {
      if (err) return console.error(err);
      user.speak();
    });
  });
});