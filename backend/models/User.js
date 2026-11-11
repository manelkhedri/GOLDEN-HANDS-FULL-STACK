const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },

  password: {
    type: String,
    minlength: 8,
    required: function () {
      return !this.googleId;
    }
  },

  googleId: {
    type: String,
    unique: true,
    sparse: true
  },

  // User permissions
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }

}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;

