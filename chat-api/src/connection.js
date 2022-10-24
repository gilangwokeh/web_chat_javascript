const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PW}@atlascluster.frsqk.mongodb.net/CHAT?retryWrites=true&w=majority`, { useUnifiedTopology: true, useNewUrlParser: true }, () => {
  console.log('connected to mongodb')
})