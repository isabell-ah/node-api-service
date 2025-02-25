const express = require('express');
const app = express();
const morgan = require('morgan');
const User = require('./utils/db');
const userRouter = require('./routes/userRouter');

const port = 2000;
//  middlewares
app.use(morgan('dev'));
app.use(express.json());
// routes
app.use('/user', userRouter);

app.get('/', (req, res) => {
  res.send('Isabellah');
});

app.listen(port, () => {
  console.log(`Server is running o port ${port}`);
});
