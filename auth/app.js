const express = require('express');
const app = express();
const connectDb = require('./config/db');
require('dotenv').config();
const authRoutes = require('./routes/authRoute');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

const port = process.env.PORT;
const mongo_uri = process.env.MONGO_URI;
app.use(express.static('public'));
app.use(express.json());
app.set('view engine', 'ejs');
app.use(cookieParser());

// routes
app.get('*', checkUser);
app.get('/', (req, res) => {
  res.render('home');
});
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));
app.use(authRoutes);

const start = () => {
  try {
    connectDb(mongo_uri);
    app.listen(port, () => {
      console.log(`Server is running on port  ${port}`);
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
start();
