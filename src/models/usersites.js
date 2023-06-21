const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

const UserSites = new Scheme({
  userId: {
    type: String,
    required: true,
    trim: true,
  },
  siteId: {
    type: String,
    required: true,
    trim: true,
  },
});

module.exports = mongoose.model('UserSites', UserSites);