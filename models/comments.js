const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: String,
  campground: { type: mongoose.Schema.ObjectId, ref: 'Campground'},
  author: {
            id: { type: mongoose.Schema.ObjectId, ref: 'User'},
            username: String
        }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
