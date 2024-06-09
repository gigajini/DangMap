const express = require('express');
const router = express.Router();
const { join, createToken, kakaoLogin, refreshToken, modifyUser, deleteUser } = require('../controllers/auth');
const passport = require('passport');

// POST/V1/auth/join
router.post('/join', join);

// POST/V1/auth/login
router.post('/login', createToken);

// GET/V1/auth/kakao
router.get('/kakao', passport.authenticate('kakao'))
router.get('/kakao/callback', kakaoLogin);
router.post('/refresh', refreshToken);

// if -> login need
// router.get('/products', verifyToken, getProduct);

module.exports = router;