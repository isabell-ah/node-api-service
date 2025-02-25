const CustomApiError = require('../errors/customApiError');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      throw new CustomApiError('Please provide email and password', 400);
    }
    // just for demo, normally provided by DB
    const id = await new Date().getDate();

    // try to keep payload small, better experience for user
    //  in prouduction use long, complex and unguessible strings
    const token = await jwt.sign({ id, username }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });
    res.status(200).json({ msg: 'user created', token });
    // res.send('Fakelogin');
    // !username ||!password? throw new CustomApiError('Please provide email and password', 400):res.send()
    // res.send('Hey Isabellah, are you okay');
  } catch (error) {
    res.status(500).send(error.message);
  }
};
const dashBoard = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')) {
      throw new CustomApiError('No token provided', 401);
    }
    const token = authHeader.split(' ')[1];
    console.log(token);

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      res.status(200).json({ msg: `Hello ${decoded.username}` });
    } catch (err) {
      throw new CustomApiError('Not authorized toaccess this route', 401);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = { login, dashBoard };
