const express = require('express');
const app = express();
const PORT = 3001;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

const campgrounds = [
  { name: 'Salmon Creek', image: 'https://farm2.staticflickr.com/1086/882244782_d067df2717.jpg' },
  { name: 'Granite Hill', image: 'https://farm9.staticflickr.com/8422/7842069486_c61e4c6025.jpg' },
  { name: 'Mountain Goats Rest', image: 'https://farm9.staticflickr.com/8454/7930198240_856a39bf27.jpg' },
  { name: 'Salmon Creek', image: 'https://farm2.staticflickr.com/1086/882244782_d067df2717.jpg' },
  { name: 'Granite Hill', image: 'https://farm9.staticflickr.com/8422/7842069486_c61e4c6025.jpg' },
  { name: 'Mountain Goats Rest', image: 'https://farm9.staticflickr.com/8454/7930198240_856a39bf27.jpg' },
  { name: 'Salmon Creek', image: 'https://farm2.staticflickr.com/1086/882244782_d067df2717.jpg' },
  { name: 'Granite Hill', image: 'https://farm9.staticflickr.com/8422/7842069486_c61e4c6025.jpg' },
  { name: 'Mountain Goats Rest', image: 'https://farm9.staticflickr.com/8454/7930198240_856a39bf27.jpg' }
];

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/campgrounds', (req, res) => {

  res.render('campgrounds', {campgrounds: campgrounds});
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

app.listen(PORT, () => {
  console.log('Yelp Camp is listening on port', PORT);
});
