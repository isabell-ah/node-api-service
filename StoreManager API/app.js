const express = require('express');
const app = express();

require('dotenv').config();
require('express-async-errors');
const morgan = require('morgan');
const dbConnect = require('./config/db');
const notFoundMiddleware = require('./middlewares/notFound');
const errorHandlerMiddleware = require('./middlewares/errorHandler');
const productRouter = require('./routes/ProductRouter');
// middleware
app.use(morgan('dev'));
app.use(express.json());

// routes
app.use('/products', productRouter);
app.get('/', (req, res) => {
  res.send('Helo');
});

// variables
const port = process.env.PORT;
const db_uri = process.env.MONGO_URI;

const start = () => {
  dbConnect(db_uri);
  //   console.log('Mongodb is connectd');
  app.listen(port, () => {
    console.log(`Server is running on port :${port}`);
  });
};
start();
