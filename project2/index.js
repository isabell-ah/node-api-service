const express = require('express');
const mongoose = require('mongoose');
// const morgan = require('morgan');
const Blog = require('./models/BlogModel.js');
// const { result } = require('lodash');
// const { render } = require('ejs');
const app = express();
const port = 3000;

//   middleware and static files
// app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
('');

// connect to mongodb
const dbURI = 'mongodb://127.0.0.1:27017/blogs';
// 'mongodb+srv://isabela:isabela@nodetuts.832cwuj.mongodb.net/?retryWrites=true&w=majority&appName=standard';
mongoose
  .connect(dbURI)
  .then((result) => console.log('connected to the db'))
  .catch((error) => {
    console.log(error);
  });

// // Connection URI
// const uri = 'mongodb://localhost:27017/mydatabase';

// // Connect to MongoDB
// mongoose.connect(uri, {});

// // Get the default connection
// const db = mongoose.connection;

// // Event listeners for Mongoose connection
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', () => {
// 	console.log('Connected to MongoDB');
// });

// routes
// app.get('/', (req, res) => {
//   res.redirect('/blogs');
// });
app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

// blog routes - Get all blogs

// app.get('/blogs', (req, res) => {
app.get('/blogs', (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render('index', { title: 'All Blogs', blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

//  get blogs/create  - displays form to create
app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create Blog' });
});

//  post handler - to create blog
app.post('/blogs', (req, res) => {
  // console.log(req.body);
  const blog = new Blog(req.body);
  blog
    .save()
    .then((result) => {
      res.redirect('/blogs');
    })
    .catch((err) => {
      console.log(err);
    });
});

//  get a single blog
app.get('blogs/:id', (req, res) => {
  // const id = req.params.id;
  // console.log(id);
  // Blog.findById(id)
  //   .then((result) => {
  //     res.render('details', { blog: result, title: 'Blog details' });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  res.send("Hellow")
});

//   404 page   alwys come at the bottom
app.use((req, res) => {
  res.status(404).render('404', { title: ' Not Found' });
});

app.listen(port, () => {
  console.log(`Server is running on prt ${port}`);
});
