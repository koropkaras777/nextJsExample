const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

const Site = new Scheme({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  url: {
    type: String,
    required: true,
    trim: true,
  },
});

module.exports = mongoose.model('Site', Site);