const express = require('express');
const usersRouter = express();
const expressSanitizer = require('express-sanitizer');
const passport = require('passport');
const localStrategy = require('passport-local');
const User = require('../models/users.js');

module.exports = usersRouter;
