// const router = require('express').Router()
const express = require('express');
const router = express();
const Post = require('../models/postModel');

// create a post
router.post('/', async (req, res) => {
  try {
    const post = await Post.create(req.body);
    res.status(201).send(post);
  } catch (err) {
    res.status(500).send(err.message);
  }
});
// update a post
router.put('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await Post.updateOne({ $set: req.body });
      res.status(200).json('the post has been updated');
    } else {
      res.status(403).send('You can update only your post');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});
// delete a post
router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await Post.deleteOne();
      res.status(200).json('the post has been deleted');
    } else {
      res.status(403).send('You can delete only your post');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});
// like/ dislike a post
router.put('/:id/like', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.bodyuserId } });
      res.status(200).json('The post has been liked');
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json('The post has been disliked');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});
// get a post
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).send(post);
  } catch (err) {
    res.status(500).send(err.message);
  }
});
// get all posts
//  get a timeline posts
router.get('/timeline/all', async (req, res) => {
  let postArry = [];
  try {
    const currentUser = await UserActivation.findById(req.body.userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    res.json(userPosts.concat(...friendPosts));
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
