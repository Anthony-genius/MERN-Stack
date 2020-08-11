/* eslint-disable no-underscore-dangle */
const { Post } = require('../../models/Post');
const { Like } = require('../../models/Like');
const { saveTag } = require('../tag/');
const { missingParameters } = require('../../helpers/errors');

const validate = (req, res, next) => {
  if (
    Array.isArray(req.body.types) &&
    Array.isArray(req.body.countries) &&
    Array.isArray(req.body.sdgs) &&
    Array.isArray(req.body.sectors) &&
    Array.isArray(req.body.industries) &&
    Array.isArray(req.body.baseAssessmentAnswers) &&
    req.body.name &&
    req.body.currency &&
    req.body.capacity
  ) {
    next();
  } else {
    res
      .status(missingParameters.status)
      .send({ message: missingParameters.message });
  }
};

const get = (req, res) => {
  Post.findById(req.params.id)
    .populate({
      path: 'owner',
      select: 'username image organization',
      populate: { path: 'organization' },
    })
    .populate('tags')
    .populate('likes', 'owner liked')
    .then((result) => {
      res.status(200).json(result);
    })
    .catch(() => res.sendStatus(500));
};

const getAll = (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .populate({
      path: 'owner',
      select: 'username image organization',
      populate: { path: 'organization' },
    })
    .populate('tags')
    .populate('likes', 'owner liked')
    .then((result) => {
      res.status(200).json(result);
    })
    .catch(e => res.status(500).send({ message: e.message }));
};

const createTags = async (selectedTags, userId) => {
  const newTags = selectedTags ? selectedTags.filter(tag => !tag._id) : [];
  const oldTags = selectedTags ? selectedTags.filter(tag => tag._id) : [];
  const newTagData = await Promise.all(
    newTags.map(tag => saveTag(tag.label, userId)),
  );

  return [...oldTags, ...newTagData];
};

const update = async (req, res) => {
  const { selectedTags, body } = req.body;
  const _id = req.params.id;
  const owner = req.user._id;

  try {
    const tags = await createTags(selectedTags, owner);
    const updatedPost = await Post.findOneAndUpdate(
      { _id, owner },
      {
        body,
        tags,
      },
      {
        new: true,
      },
    );

    const result = await Post.findById(updatedPost._id)
      .populate({
        path: 'owner',
        select: 'username organization',
        populate: { path: 'organization' },
      })
      .populate('tags')
      .populate('likes', 'owner liked');

    return res.status(200).json(result);
  } catch (e) {
    return res.status(500).send({ message: e.message });
  }
};

const post = async (req, res) => {
  try {
    const { selectedTags } = req.body;
    const owner = req.user._id;
    const tags = await createTags(selectedTags, owner);
    const postObj = new Post({
      ...(req && req.body),
      owner,
      tags,
    });

    const saveRes = await postObj.save();
    const result = await Post.findById(saveRes._id)
      .populate({
        path: 'owner',
        select: 'image username organization',
        populate: { path: 'organization' },
      })
      .populate('tags');

    return res.status(200).json(result);
  } catch (e) {
    return res.status(500).send({ message: e.message });
  }
};

const deletePost = (req, res) => {
  const _id = req.params.id;
  const owner = req.user._id;

  Post.findOne({ _id, owner })
    .remove()
    .then(result => res.status(200).json(result))
    .catch(e => res.status(500).send({ message: e.message }));
};

const togglePostLike = async (req, res) => {
  try {
    const owner = req.user._id;
    const postId = req.params.id;
    const currLike = await Like.findOne({ owner, post: postId });

    if (!currLike) {
      const like = await new Like({ owner, post: postId, liked: true }).save();
      await Post.findByIdAndUpdate(postId, {
        $addToSet: { likes: like },
        $inc: { likeCount: 1 },
      });
      return res.status(200).json(like);
    }

    const inc = currLike.liked ? -1 : 1;
    const like = await Like.findOneAndUpdate(
      { owner, post: postId },
      { liked: !currLike.liked },
      { upsert: true, new: true },
    );
    await Post.findByIdAndUpdate(postId, { $inc: { likeCount: inc } });
    return res.status(200).json(like);
  } catch (e) {
    return res.status(500).send({ message: e.message });
  }
};

module.exports = {
  validate,
  get,
  getAll,
  deletePost,
  post,
  update,
  togglePostLike,
};
