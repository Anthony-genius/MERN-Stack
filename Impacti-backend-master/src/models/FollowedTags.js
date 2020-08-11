const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FollowedTags = mongoose.model(
  'FollowedTags',
  new Schema(
    {
      organization: { type: Schema.Types.ObjectId, ref: 'Organization' },
      tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
    },
    {
      timestamps: true,
    },
  ),
);

module.exports = { FollowedTags };
