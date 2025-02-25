const express = require('express');
const router = express();
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
// getting all users
router.get('/', async (req, res) => {
  try {
    const user = await User.find();
    if (!user) {
      return res.status(404).send();
    }
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    res.status(200).send(user);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   if (!email || !password) {
//     throw new Error('All fields are mandatory');
//   }
//   const user = await User.findOne({ email });
//   if (user && (await bcrypt.compare(password, user.password))) {
//     res.status(200).send(user);
//   } else {
//     throw new Error('Invalid credentials');
//   }
// });

// create a user
router.post('/', async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).send(user);
  } catch (err) {
    res.status(500).send(err.message);
    console.log(err);
  }
});
// get one user
router.get('/:id', async (req, res) => {
  console.log(req.params);

  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(400).send();
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// update user

router.patch('/:id', async () => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) return res.status(400).send();
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
});
// delete
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(400).send();
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
});
module.exports = router;
