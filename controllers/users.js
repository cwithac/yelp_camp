const express = require('express');
const usersRouter = express();
const expressSanitizer = require('express-sanitizer');
const passport = require('passport');
const localStrategy = require('passport-local');
const User = require('../models/users.js');

//Authorization & Registration
usersRouter.get('/register', async (req, res) => {
  try {
    res.render('users/register');
  } catch (err) {
    res.send(err.message);
  };
});

usersRouter.post('/', async(req, res) => {
  try {
    const newUser = await new User({username: req.body.username});
    User.register(newUser, req.body.password, (err, user) => {
      if (err) {
        // console.log(err);
        return res.render('users/register');
      }
      passport.authenticate('local')(req, res, () => {
        res.redirect('/campgrounds');
      })
    })
  } catch (err) {
    res.send(err.message);
  };
});

//Login
usersRouter.get('/login', async (req, res) => {
  try {
    res.render('users/login');
  } catch (err) {
    res.send(err.message);
  };
});

usersRouter.post('/login', passport.authenticate('local',
    {
      successRedirect: '/campgrounds',
      failureRedirect: '/users/login'
    }), (req, res) => {
});

module.exports = usersRouter;
