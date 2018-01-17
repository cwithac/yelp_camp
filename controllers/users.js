const express = require('express');
const usersRouter = express();
const expressSanitizer = require('express-sanitizer');
const passport = require('passport');
const localStrategy = require('passport-local');
const User = require('../models/users.js');

//Authorization
usersRouter.get('/register', async (req, res) => {
  try {
    res.render('users/register');
  } catch (err) {
    res.send(err.message);
  };
});

usersRouter.post('/', async(req, res) => {
  try {
    res.json(req.body)
  } catch (err) {
    res.send(err.message);
  };
})

module.exports = usersRouter;
