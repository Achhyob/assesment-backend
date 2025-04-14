// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const { register, login, logout } = require('../controllers/auth');

// POST /api/auth/register
router.post('/register', async (req, res, next) => {
  try {
    await register(req, res);
  } catch (err) {
    next(err);
  }
});

// POST /api/auth/login
router.post('/login', async (req, res, next) => {
  try {
    await login(req, res);
  } catch (err) {
    next(err);
  }
});

// POST /api/auth/logout
router.post('/logout', logout);

module.exports = router;