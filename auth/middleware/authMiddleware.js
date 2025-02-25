const jwt = require('jsonwebtoken');
const User = require('../models/userMode');

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  // console.log(token);

  //   check json web token exist & verified
  if (token) {
    jwt.verify(token, 'isabellah12', (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect('/login');
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect('/login');
  }
};

// check current user
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;

  // check of token exists
  if (token) {
    jwt.verify(token, 'isabellah12', async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.locals.user = null;
        next();
      } else {
        // console.log(decodedToken);
        let user = await User.findById(decodedToken.id);
        console.log(user);
        res.locals.user = user;
        next;
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports = { requireAuth, checkUser };
