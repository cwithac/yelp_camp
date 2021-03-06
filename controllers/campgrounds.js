const express = require('express');
const campgroundRouter = express();
const Campground = require('../models/campgrounds.js');
const Comment = require('../models/comments.js');
const User = require('../models/users.js');

// Logged in Verification Middelware
const isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated()) {
    return next();
  };
  res.redirect('/users/login');
};

//ROUTING
//Index
campgroundRouter.get('/', async (req, res) => {
  try {
    const allCampgrounds = await Campground.find().sort({location : 1});
    res.render('index', {allCampgrounds, page: 'campgrounds'});
  } catch (err) {
    res.send(err.message);
  };
});

//New
campgroundRouter.get('/new', isLoggedIn, (req, res) => {
    res.render('new');
});

//Create
campgroundRouter.post('/', async (req, res) => {
  try {
    if (req.body.image.trim() === '') {
      req.body.image = 'https://i.imgur.com/w8RCqEY.jpg';
    };
    if (req.body.description.trim() === '') {
      req.body.description = "Just pretend you are a whisper floating across a mountain. This painting comes right out of your heart. You don't want to kill all your dark areas they are very important. Look around, look at what we have. Beauty is everywhere, you only have to look to see it. We need dark in order to show light.";
    };
    req.body.description = req.sanitize(req.body.description);
    const newCampground = await Campground.create(req.body);
    newCampground.author.id = req.user._id;
    newCampground.author.username = req.user.username;
    newCampground.save();
    res.redirect('/campgrounds/' + newCampground._id);
  } catch (err) {
    res.send(err.message);
  };
});

//Show
campgroundRouter.get('/:id', async (req, res) => {
  try {
    const foundCampground = await Campground.findById(req.params.id);
    const associatedComments = await Comment.find({ campground: foundCampground._id }).sort({createdAt : -1});
    res.render('show', {foundCampground, associatedComments});
  } catch (err) {
    res.send(err.message);
  };
});

//Edit
campgroundRouter.get('/:id/edit', async (req, res) => {
  try {
    const foundCampground = await Campground.findById(req.params.id);
    res.render('edit', {foundCampground});
  } catch (err) {
    res.send(err.message);
  };
});

//Update
campgroundRouter.put('/:id', async (req, res) => {
  try {
    req.body.description = req.sanitize(req.body.description);
    const updatedCampground = await Campground.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.redirect('/campgrounds/' + updatedCampground._id);
  } catch (err) {
    res.send(err.message);
  };
});

//Destroy
campgroundRouter.delete('/:id', async (req, res) => {
  try {
    const deletedCampground = await Campground.findByIdAndRemove(req.params.id);
    const associatedComments = await Comment.find({ campground: deletedCampground._id }).remove();
    req.flash('error', 'Campground has been successfully deleted.');
    res.redirect('/campgrounds')
  } catch (err) {
    res.send(err.message);
  };
});

module.exports = campgroundRouter;
