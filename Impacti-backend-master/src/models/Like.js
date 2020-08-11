const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Like = mongoose.model(
  'Like',
  new Schema(
    {
      owner: { type: Schema.Types.ObjectId, ref: 'User' },
      post: { type: Schema.Types.ObjectId, ref: 'Post' },
      liked: Boolean,
    },
    {
      timestamps: true,
    },
  ),
);

module.exports = { Like };
