const express = require('express');
const commentsRouter = express();
const Comment = require('../models/comments.js');

//Create
commentsRouter.post('/', async (req, res) => {
  try {
    req.body.content = req.sanitize(req.body.content);
    const newComment = await Comment.create(req.body);
    res.redirect('/campgrounds/' + newComment.campground);
  } catch (err) {
    res.send(err.message);
  };
});

module.exports = commentsRouter;
