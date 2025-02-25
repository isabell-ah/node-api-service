const express = require('express');
const app = express();
const morgan = require('morgan');
const helmet = require('helmet');
const userRouter = require('./routes/userRouter');
const authRouter = require('./routes/authRouter');
const postRouter = require('./routes/postsRouter');
const dotenv = require('dotenv');
require('./config/db');
// require('./env');
dotenv.config();
const port = process.env.PORT || 4000;

// middlewares
app.use(express.json());
app.use(helmet());
app.use(morgan('dev'));
app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use('/posts', postRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
