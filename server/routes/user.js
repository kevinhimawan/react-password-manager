var express = require('express');
var router = express.Router();

const { usersignup } = require('../controllers/User.controller')

/* GET users listing. */
router.post('/signup', usersignup)

module.exports = router;
