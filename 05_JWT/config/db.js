const mongoose = require('mongoose');
const connectDb = (uri) => {
  mongoose.connect(uri, console.log('Connected to MongoDb'));

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'Mongoose connection error'));
};
module.exports = connectDb;
