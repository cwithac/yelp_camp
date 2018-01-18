const mongoose = require('mongoose');

const campgroundSchema = new mongoose.Schema({
  name: String,
  image: {type: String, default: 'https://picsum.photos/500/300?image=1020'},
  description: {type: String, default: "Just pretend you are a whisper floating across a mountain. This painting comes right out of your heart. You don't want to kill all your dark areas they are very important. Look around, look at what we have. Beauty is everywhere, you only have to look to see it. We need dark in order to show light."},
  price: String,
  location: String,
  locationURL: String,
  author: {
            id: { type: mongoose.Schema.ObjectId, ref: 'User'},
            username: String
          }
});

const Campground = mongoose.model('Campground', campgroundSchema);

module.exports = Campground;
