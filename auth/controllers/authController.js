const User = require('../models/userMode');
const jwt = require('jsonwebtoken');

// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: '', password: '' };
  // duplicate error code
  if (err.code === 11000) {
    errors.email = 'This email is already registered';
    return errors;
  }
  // incorrect email
  if (err.message === 'Incorrect email') {
    errors.email = 'This email is not registered';
    // return errors;
  }
  if (err.message === 'Incorrect password')
    errors.password = 'This password is incorrect';

  // validation errors
  if (err.message.includes('User validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};
const maxAge = 3 * 24 * 60 * 60;

// createt tokens
const createToken = (id) => {
  return jwt.sign({ id }, 'isabellah12', {
    expiresIn: maxAge,
  });
};

module.exports.signup_get = async (req, res) => {
  try {
    const users = await User.find();

    // res.status(200).json({ nbHits: users.length, users });
    res.render('signup');
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

module.exports.login_get = (req, res) => {
  res.render('login');
};

module.exports.signup_post = async (req, res) => {
  try {
    // const {email, password} = req.body
    const user = await User.create(req.body);
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ msg: 'Sucess! _user created', user: user._id });
  } catch (err) {
    // console.log(err.message);
    const errors = handleErrors(err);
    res.status(500).json({ errors });
  }
};

module.exports.login_post = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};
