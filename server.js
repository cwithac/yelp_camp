//Global Variables/Initiators
const express = require('express');
const app = express();
const PORT = 3001;
const mongoose = require('mongoose');

//Middleware
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

//Controller Middleware
const campgroundsController = require('./controllers/campgrounds.js');
app.use('/campgrounds', campgroundsController);

//Landing Page Route
app.get('/', (req, res) => {
  res.render('index');
});

//Listeners for app and MongoDB
const mongoURI = 'mongodb://localhost/yelpcamp';
mongoose.connect(mongoURI, { useMongoClient: true});
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('error', (err) => console.log(err.message));
db.on('connected', () => console.log('Mongo running: ', mongoURI));

app.listen(PORT, () => {
  console.log('Yelp Camp is listening on port', PORT);
});
