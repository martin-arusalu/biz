const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  emailAddress: {
    type: String,
    required: true,
    unique: true,
  },
  userName: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  companies : [{ type: Schema.Types.ObjectId, ref: 'Company' }]
});

module.exports = mongoose.model('User', UserSchema);