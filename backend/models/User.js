const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  full_name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
  username: { type: String, required: true, unique: true, trim: true, index: true },
  password: { type: String, required: true },
  created_at: { type: Date, default: Date.now }
});

UserSchema.index({ email: 1 });
UserSchema.index({ username: 1 });

module.exports = mongoose.model('User', UserSchema);
