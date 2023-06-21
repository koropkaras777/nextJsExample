const mongoose = require('mongoose');

require('dotenv').config();

mongoose.connect(process.env.dbUrl, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});