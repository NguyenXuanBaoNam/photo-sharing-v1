const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  _id: String,
  date_time: Date,
  comment: String,
  user: {
    _id: String,
    first_name: String,
    last_name: String,
  },
  photo_id: String,
});

const photoSchema = new mongoose.Schema({
  _id: String,
  date_time: Date,
  file_name: String,
  user_id: String,
  comments: [commentSchema],
});

const Photo = mongoose.model("Photo", photoSchema);

module.exports = Photo;

