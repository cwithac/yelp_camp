//Global Variables/Initiators
const express = require('express');
const app = express();
const PORT = 3001;
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const expressSanitizer = require('express-sanitizer');
const passport = require('passport');
const localStrategy = require('passport-local');
const User = require('./models/users.js');

//Middleware
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false}));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(expressSanitizer());

//Passport Middleware
app.use(require('express-session')({
    secret: 'qwerty',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Current User Middleware
app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

//Controller Middleware
const campgroundsController = require('./controllers/campgrounds.js');
app.use('/campgrounds', campgroundsController);
const commentsController = require('./controllers/comments.js');
app.use('/comments', commentsController);
const usersController = require('./controllers/users.js');
app.use('/users', usersController);



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
