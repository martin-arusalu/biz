import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  password: String,
  money: Number,
  companies : [{ type: Schema.Types.ObjectId, ref: 'Company' }]
});

const User = mongoose.model('User', UserSchema);

export default User;