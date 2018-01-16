const express = require('express');
const app = express();
const Campground = require('../models/campgrounds.js');

app.get('/', async (req, res) => {
  try {
    const allCampgrounds = await Campground.find();
    res.render('campgrounds', {campgrounds: allCampgrounds});
  } catch (err) {
    res.send(err.message);
  };
});

app.get('/create', (req, res) => {
    res.render('create');
});

app.post('/', async (req, res) => {
  try {
    const newCampground = await Campground.create(req.body);
    res.redirect('campgrounds');
  } catch (err) {
    res.send(err.message);
  };
});

app.get('/:id', async (req, res) => {
  try {
    const foundCampground = await Campground.findById(req.params.id);
    res.render('read', {foundCampground});
  } catch (err) {
    res.send(err.message)
  };
});

module.exports = app;
