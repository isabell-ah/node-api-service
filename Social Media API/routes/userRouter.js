const express = require('express');
const router = express();
const User = require('../models/userModel');
const bcrypt = require('bcrypt');

// update user
router.put('/:id', async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        res.status(500).json(err.message);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).send('Account has been updated');
    } catch (err) {
      res.status(400).send(err.message);
    }
  } else {
    return res.status(403).json('You can only update your account');
  }
});
// delete user
router.delete('/:id', async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200).send('Account has been deleted successuflly');
    } catch (err) {
      res.status(400).send(err.message);
    }
  } else {
    return res.status(403).json('You can only delete your account');
  }
});

// get a user
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, updatedAt, ...other } = user._doc;
    !user
      ? res.send('User not found')
      : // !user && res.status(400).send('No such user');
        res.status(200).json(other);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// follow a user
router.put('/:id/follow', async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { following: req.body.userId } });
        res.status(200).json('user has been followed');
      } else {
        res.status(403).send('You already follow this user');
      }
    } catch (err) {
      res.status(500).json(err.message);
    }
  } else {
    res.status(403).send('You cannot follow yourself');
  }
});
// unfollow a user
router.put('/:id/unfollow', async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { following: req.body.userId } });
        res.status(200).json('user has been unfollowed');
      } else {
        res.status(403).send('You do not follow this user');
      }
    } catch (err) {
      res.status(500).json(err.message);
    }
  } else {
    res.status(403).send('You cannot  unfollow yourself');
  }
});
// get users
router.get('/', async (req, res) => {
  const user = await User.find();
  res.status(200).json(user);
});

// post
// router.post('/', async (req, res) => {
//   try {
//     const user = await User.create(req.body);
//     res.status(201).send(user);
//   } catch (err) {
//     res.status(500).send(err.message);
//     console.error(err);
//   }
// });

// router.post('/', async (req, res) => {
//   const user = new User(req.body);
//   try {
//     await user.save();
//     res.status(201).send(user);
//   } catch (err) {
//     res.status(500).send(err.message);
//     console.log(err);
//   }
// });

module.exports = router;
