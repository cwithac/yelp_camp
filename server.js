const express = require('express');
const app = express();
const PORT = 3001;
const mongoose = require('mongoose');
const Campground = require('./models/campgrounds.js');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/campgrounds', async (req, res) => {
  try {
    const allCampgrounds = await Campground.find();
    res.render('campgrounds', {campgrounds: allCampgrounds});
  } catch (err) {
    res.send(err.message);
  };
});

app.get('/campgrounds/create', (req, res) => {
    res.render('create');
});

app.post('/campgrounds', async (req, res) => {
  try {
    const newCampground = await Campground.create(req.body);
    res.redirect('campgrounds');
  } catch (err) {
    res.send(err.message);
  };
});

app.get('/campgrounds/:id', async (req, res) => {
  try {
    const foundCampground = await Campground.findById(req.params.id);
    res.render('read', {foundCampground});
  } catch (err) {
    res.send(err.message)
  };
});

const mongoURI = 'mongodb://localhost/yelpcamp';
mongoose.connect(mongoURI, { useMongoClient: true});
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('error', (err) => console.log(err.message));
db.on('connected', () => console.log('Mongo running: ', mongoURI));

app.listen(PORT, () => {
  console.log('Yelp Camp is listening on port', PORT);
});
