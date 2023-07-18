const mongoose = require('mongoose');
const schema = mongoose.Schema;
const userSchema = new schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model('User', userSchema);
