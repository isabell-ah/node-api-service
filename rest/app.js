const express = require('express');
const app = express();
require('dotenv').config();
const connectDb = require('./config/db');
const productRouter = require('./routes/productRoute');

// variables
const port = process.env.PORT;
const mongo_uri = process.env.MONGO_URI;

// routes
app.use('/', productRouter);

const start = () => {
  connectDb(mongo_uri);
  app.listen(port, () => console.log(`Server is running on port ${port}`));
};
start();
