/* eslint-disable no-underscore-dangle */
const { Comment } = require('../../models/Comment');

const get = (req, res) => {
  Comment.findById(req.params.id)
    .populate({
      path: 'author',
      select: 'username image organization',
      populate: { path: 'organization' },
    })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch(() => res.sendStatus(500));
};

const getAll = (req, res) => {
  Comment.find()
    .sort({ date: +1 })
    .populate({
      path: 'author',
      select: 'username image organization',
      populate: { path: 'organization' },
    })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch(() => res.sendStatus(500));
};

const comment = (req, res) => {
  const commentObj = new Comment({
    ...(req && req.body),
    author: req.user._id,
  });

  commentObj
    .save()
    .then((saveRes) => {
      Comment.findById(saveRes._id)
        .populate({
          path: 'comment',
          populate: { path: 'posts' },
        })
        .populate({
          path: 'author',
          select: 'username image organization',
        })
        .then((result) => {
          res.status(200).json(result);
        });
    })
    .catch(e => res.status(500).send({ message: e.message }));
};

module.exports = {
  get,
  getAll,
  comment,
};
