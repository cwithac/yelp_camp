const express = require('express');
const app = express();
const Campground = require('../models/campgrounds.js');

//Index
app.get('/', async (req, res) => {
  try {
    const allCampgrounds = await Campground.find();
    res.render('index', {allCampgrounds});
  } catch (err) {
    res.send(err.message);
  };
});

//New
app.get('/new', (req, res) => {
    res.render('new');
});

//Create
app.post('/', async (req, res) => {
  try {
    if (req.body.image.trim() === '') {
      req.body.image = 'https://picsum.photos/500/300?image=1020';
    };
    if (req.body.description.trim() === '') {
      req.body.description = "Just pretend you are a whisper floating across a mountain. This painting comes right out of your heart. You don't want to kill all your dark areas they are very important. Look around, look at what we have. Beauty is everywhere, you only have to look to see it. We need dark in order to show light.";
    };
    req.body.description = req.sanitize(req.body.description);
    const newCampground = await Campground.create(req.body);
    res.redirect('campgrounds');
  } catch (err) {
    res.send(err.message);
  };
});

//Show
app.get('/:id', async (req, res) => {
  try {
    const foundCampground = await Campground.findById(req.params.id);
    res.render('show', {foundCampground});
  } catch (err) {
    res.send(err.message);
  };
});

//Edit
app.get('/:id/edit', async (req, res) => {
  try {
    const foundCampground = await Campground.findById(req.params.id);
    res.render('edit', {foundCampground});
  } catch (err) {
    res.send(err.message);
  };
});

//Update
app.put('/:id', async (req, res) => {
  try {
    req.body.description = req.sanitize(req.body.description);
    const updatedCampground = await Campground.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.redirect('/campgrounds/' + updatedCampground._id);
  } catch (err) {
    res.send(err.message);
  };
});

//Destroy
app.delete('/:id', async (req, res) => {
  try {
    const deletedCampground = await Campground.findByIdAndRemove(req.params.id);
    res.redirect('/campgrounds')
  } catch (err) {
    res.send(err.message);
  };
});


module.exports = app;
