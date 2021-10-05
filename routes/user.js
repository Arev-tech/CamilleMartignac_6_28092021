const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

//---- POST method pour s'inscrire ----//
router.post('/signup', userCtrl.signup);

//---- POST method pour se connecter ----//
router.post('/login', userCtrl.login);

module.exports = router;