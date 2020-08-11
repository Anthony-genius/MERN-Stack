const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Post = mongoose.model('Post', new Schema({
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  body: { type: String },
  tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
  likes: [{ type: Schema.Types.ObjectId, ref: 'Like' }],
  likeCount: { type: Number, default: 0 },
  date: { type: Date, default: Date.now },
  category: { type: String },
  title: { type: String },
  subheader: { type: String },
  link: { type: String },
  linkTextToDisplay: { type: String },
}));

module.exports = { Post };
