const express = require('express');
const router = express();
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
// router.get('/', async (req, res) => {
//   const user = await User.find();
//   res.status(200).send(user);
// });

//  reister user
// router.post('/', async (req, res) => {
//   try {
//     // generate salt
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(req.body.password, salt);

//     const newUser = new User({
//       username: req.body.username,
//       email: req.body.email,
//       password: hashedPassword,
//     });
//     //  save usr and return response
//     const user = newUser.save();
//     res.status(201), json(user);
//   } catch (err) {
//     res.status(500).send(err.message);
//   }
// });
//  register user
// app.post('/register', async (req, res) => {
//   try {
//     const { username, email, password } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = new User({ username, email, password: hashedPassword });
//     await newUser.save();
//     res.status(201).send('User registered successfully');
//   } catch (error) {
//     console.error('Error registering user:', error);
//     res.status(500).send('Error registering user');
//   }
// });

//app.post('/register', async (req, res) => {
//   try {
//     const { username, email, password } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Use MongoDB's create function to create a new user
//     await User.create({ username, email, password: hashedPassword });

//     res.status(201).send('User registered successfully');
//   } catch (error) {
//     console.error('Error registering user:', error);
//     res.status(500).send('Error registering user');
//   }
// });

router.post('/register', async (req, res) => {
  const { username, password, email } = req.body;
  try {
    // create user
    const user = await User.create(req.body);
    res.status(201).send(`Successfully registered ${user}`);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//user login
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(404).json('user not found');
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !validPassword && res.status(400).json('Wrong password');
    res.status(200).json(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
