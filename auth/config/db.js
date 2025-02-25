const mongoose = require('mongoose');
const connectDb = (uri) => {
  mongoose.connect(uri, console.log(`Connected to the MongoDb`));
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'Mongodb connection error'));
};
module.exports = connectDb;
