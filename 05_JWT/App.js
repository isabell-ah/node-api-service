const express = require('express');
const app = express();
require('dotenv').config();
require('express-async-errors');
const morgan = require('morgan');
const connectDb = require('./config/db');
const login = require('./routes/mainRouter');
const notFound = require('./middlwares/not_found');
const errorHandlerMiddleware = require('./middlwares/error-handler');
// variables
const port = process.env.port;
const Mongo_uri = process.env.MONGO_URI;

// middlwares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static('./public'));

// app.use(notFound);
app.use(errorHandlerMiddleware);

// routes
app.use('/api/v1', login);
app.get('/', (req, res) => {
  res.send('Hello How are you doing');
});
// app.use('/login', login);

const start = async () => {
  try {
    await connectDb(Mongo_uri);
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
start();
