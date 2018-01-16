//Global Variables/Initiators
const express = require('express');
const app = express();
const PORT = 3001;
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const expressSanitizer = require('express-sanitizer');

//Middleware
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false}));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(expressSanitizer());

//Controller Middleware
const campgroundsController = require('./controllers/campgrounds.js');
app.use('/campgrounds', campgroundsController);
const commentsController = require('./controllers/comments.js');
app.use('/comments', commentsController);

//Landing Page Route
app.get('/', (req, res) => {
  res.render('landing');
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
