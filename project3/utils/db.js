const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/user');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDb connection error'));
