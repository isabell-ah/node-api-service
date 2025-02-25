const express = require('express');
const app = express();
const tasksRouter = require('./routes/tasks');
const morgan = require('morgan');
const dotenv = require('dotenv');
require('dotenv').config();
const dbconnect = require('./config/db');
const notFound = require('./middlewares/not_found');
const errorHandler = require('./middlewares/errrohandler');
// middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static('public'));

// routes
app.use('/api/tasks', tasksRouter);
app.use(notFound);
app.use(errorHandler);

const Port = process.env.PORT;
const db_url = process.env.MONGO_URI;

const start = async () => {
  try {
    await dbconnect(db_url);
    console.log('MongoDb is connected');
    app.listen(Port, () => {
      console.log(`Server is running on  port ${Port}`);
    });
  } catch (err) {
    console.log('Error connecting to server', err);
    process.exit(1);
  }
};
start();
