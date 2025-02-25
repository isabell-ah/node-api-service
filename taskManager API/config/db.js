// method 1
// const mongoose = require('mongoose')
// mongoose.connect('mongodb://127.0.0.1:27017/tasks')
// const db = mongoose.connection
// db.on('error', (console.error.bind(console, "MongoDb connection Error")))
// db.on('open', ()=>{
//  console.log(`Connected to MongoDb')})
//module.exports = db

// method 2
// const mongoose = require('mongoose')
// mongoose.connect(process.env.MONGO_URI).then(()=>console.log("Connected to the DB"))
// .catch ((err) => console.log(err))

// method3
const mongoose = require('mongoose');
const dbConnect = (uri) => {
  mongoose.connect(uri);
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDb connection Error'));
  //   db.once('open', () => {
  //     console.log(`Connected to MongoDb`);
  //   });
};
module.exports = dbConnect;
