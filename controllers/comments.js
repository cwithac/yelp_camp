const express = require('express');
const commentsRouter = express();
const Comment = require('../models/comments.js');
const User = require('../models/users.js');

//Create
commentsRouter.post('/', async (req, res) => {
  try {
    req.body.content = req.sanitize(req.body.content);
    const newComment = await Comment.create(req.body);
    newComment.author.id = req.user._id;
    newComment.author.username = req.user.username;
    newComment.save();
    res.redirect('/campgrounds/' + newComment.campground);
  } catch (err) {
    res.send(err.message);
  };
});

module.exports = commentsRouter;
