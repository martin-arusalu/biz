const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  money: Number,
  companies : [{ type: Schema.Types.ObjectId, ref: 'Company' }]
});

module.exports = mongoose.model('User', UserSchema);