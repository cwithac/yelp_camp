const express = require('express');
const usersRouter = express();
const expressSanitizer = require('express-sanitizer');
const passport = require('passport');
const localStrategy = require('passport-local');
const User = require('../models/users.js');

//Authorization & Registration
usersRouter.get('/register', async (req, res) => {
  try {
    res.render('users/register', {page: 'register'});
  } catch (err) {
    res.send(err.message);
  };
});

usersRouter.post('/', async(req, res) => {
  try {
    const newUser = await new User({username: req.body.username});
    User.register(newUser, req.body.password, (err, user) => {
      if (err) {
        req.flash('error', err.message);
        return res.redirect('users/register');
      }
      passport.authenticate('local')(req, res, () => {
        req.flash('success', 'Welcome to YelpCamp ' + user.username + '!');
        return res.redirect('/campgrounds');
      })
    })
  } catch (err) {
    res.send(err.message);
  };
});

//Login
usersRouter.get('/login', async (req, res) => {
  try {
    res.render('users/login', {page: 'login'});
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

//Logout
usersRouter.get('/logout', (req, res) => {
  req.logout();
  // req.flash('info', 'Logout Successful');
  res.redirect('/');
});

//Logged in Verification Middelware
// const isLoggedIn = (req, res, next) => {
//   if(req.isAuthenticated()) {
//     return next();
//   };
//   res.redirect('/login');
// };

module.exports = usersRouter;
