import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: String,
  password: String,
  companies: [{ type: Schema.Types.ObjectId, ref: 'Company' }]
});

const User = mongoose.model('User', UserSchema);

export default User;