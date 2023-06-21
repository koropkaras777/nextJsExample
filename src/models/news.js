const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

const News = new Scheme({
  siteId: {
    type: String,
    required: true,
    trim: true,
  },
  data: [{
    title: {
      type: String,
      required: true,
      trim: true,
    },
    url: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
  }],
});

module.exports = mongoose.model('News', News);