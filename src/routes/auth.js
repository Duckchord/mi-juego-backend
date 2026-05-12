'use strict';
const express = require('express');
const ctrl = require('../controllers/auth.controller');
const authJwt = require('../middlewares/authJwt');

const router = express.Router();

router.post('/login', ctrl.login);
router.post('/register', ctrl.register);
router.get('/me', authJwt, ctrl.me);

module.exports = router;