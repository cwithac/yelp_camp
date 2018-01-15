const express = require('express');
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/campgrounds', (req, res) => {
  const campgrounds = [
    { name: 'Salmon Creek', image: 'https://farm2.staticflickr.com/1086/882244782_d067df2717.jpg' },
    { name: 'Granite Hill', image: 'https://farm9.staticflickr.com/8422/7842069486_c61e4c6025.jpg' },
    { name: 'Mountain Goats Rest', image: 'https://farm9.staticflickr.com/8454/7930198240_856a39bf27.jpg' }
  ];
  res.render('campgrounds')
});

app.listen(PORT, () => {
  console.log('Yelp Camp is listening on port', PORT);
});
