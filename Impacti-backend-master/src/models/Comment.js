const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Comment = mongoose.model('Comment', new Schema({
  post: { type: Schema.Types.ObjectId, ref: 'Post' },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  date: { type: Date, default: Date.now },
  text: { type: String },
}));

module.exports = { Comment };
