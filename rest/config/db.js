const mongoose = require('mongoose');
const connectDb = (url) => {
  mongoose.connect(url, console.log('Db is connected'));

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDb connection error'));
};

module.exports = connectDb;
