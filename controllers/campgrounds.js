const express = require('express');
const app = express();
const Campground = require('../models/campgrounds.js');

//Index
app.get('/', async (req, res) => {
  try {
    const allCampgrounds = await Campground.find();
    res.render('index', {campgrounds: allCampgrounds});
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
    res.send(err.message)
  };
});

module.exports = app;
