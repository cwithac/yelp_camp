const express = require('express');
const app = express();
const PORT = 3001;
const mongoose = require('mongoose');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

const campgroundSchema = new mongoose.Schema({
  name: String,
  image: String
});

const Campground = mongoose.model('Campground', campgroundSchema);

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/campgrounds', async (req, res) => {
  try {
    const campgrounds = await Campground.find();
    res.render('campgrounds', {campgrounds: campgrounds});
  } catch (err) {
    res.send(err.message);
  };
});

app.get('/campgrounds/create', (req, res) => {
    res.render('create');
});

app.post('/campgrounds', (req, res) => {
  const name = req.body.name;
  const image = req.body.image;
  const newCampground = {name: name, image: image};
  campgrounds.push(newCampground);
  res.redirect('campgrounds')
});

const mongoURI = 'mongodb://localhost/yelpcamp';
mongoose.connect(mongoURI, { useMongoClient: true});
mongoose.Promise = global.Promise;

app.listen(PORT, () => {
  console.log('Yelp Camp is listening on port', PORT);
});
