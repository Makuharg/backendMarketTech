const express = require('express');
const router = express.Router();
const SignupController = require('../controllers/signupController');

router.post('/signup', SignupController.signUp);


module.exports = router;
