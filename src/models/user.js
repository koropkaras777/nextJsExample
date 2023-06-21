const mongoose = require('mongoose');
const validator = require('validator');
const Scheme = mongoose.Schema;

const User = new Scheme({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    validate(value) {
      if(validator.isEmail(value) != true) {
        throw new Error('Email is not valid')
      }
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if(value.length < 6) {
        throw new Error('Password is not valid');
      }
    },
  },
  token: {
    type: String,
    required: true,
  }
});

User.pre('save', async function(next) {
  const user = this;
  next();
})

module.exports = mongoose.model('User', User);