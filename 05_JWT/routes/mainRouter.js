const express = require('express');
const { login, dashBoard } = require('../controllers/mainController');
const router = express();
router.route('/').post(login);
router.route('/dashboard').get(dashBoard);
module.exports = router;
