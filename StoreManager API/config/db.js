const mongoose = require('mongoose');

const connectDb = (uri) => {
  mongoose.connect(uri, console.log('Mongodb is connectd'));
  const db = mongoose.connection;

  //   db.on('open', () => {
  //     console.log('Db is connected');
  //   });
  db.on('error', console.error.bind(console, 'Mongoose connection Error'));
};

module.exports = connectDb;
