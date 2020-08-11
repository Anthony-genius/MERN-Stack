/* eslint-disable no-underscore-dangle */
const { Tag } = require('../../models/Tag');
const { FollowedTags } = require('../../models/FollowedTags');
const { Post } = require('../../models/Post');

const getAll = (req, res) => {
  Tag.find()
    .populate({
      path: 'createdBy',
      select: 'username',
    })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch(() => res.sendStatus(500));
};

const saveTag = (label, userId) => {
  const tagObj = new Tag({
    label,
    userCreated: true,
    createdBy: userId,
  });
  return tagObj.save();
};

const create = (req, res) => {
  saveTag(req.body.label, req.user._id)
    .then((saveRes) => {
      Tag.findById(saveRes._id)
        .populate({
          path: 'createdBy',
          select: 'username',
        })
        .then((result) => {
          res.status(200).json(result);
        });
    })
    .catch(e => res.status(500).send({ message: e.message }));
};

const getAllDefaultTags = (req, res) => {
  Tag.find({ userCreated: false })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch(() => res.sendStatus(500));
};

const searchUserTags = (req, res) => {
  const search = req.params.search;
  const searchRegex = new RegExp(search, 'i');

  Tag.find({ label: searchRegex })
    .limit(16)
    .populate({
      path: 'createdBy',
      select: 'username',
    })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch(() => res.sendStatus(500));
};

const trendingTags = (req, res) => {
  const d = new Date(new Date().getTime() - (14 * 24 * 60 * 60 * 1000));
  Post.aggregate([
    {
      $match: {
        date: { $gte: d },
      },
    },
    { $unwind: '$tags' },
    { $group: { _id: { id: '$name', tag: '$tags' }, count: { $sum: 1 } } },
    {
      $group: {
        _id: '$_id.tag',
        count: { $first: '$count' },
      },
    },
    { $sort: { count: -1 } },
  ])
    .limit(4)
    .then(result => Promise.all(result.map(({ _id }) => Tag.findById(_id))))
    .then(result => res.status(200).json(result))
    .catch(e => res.status(500).send({ message: e.message }));
};

const saveFollowedTags = async (req, res) => {
  try {
    const { tags } = req.body;
    const { organization } = req.user;
    const result = await new FollowedTags({ organization, tags }).save();
    return res.status(200).json(result);
  } catch (e) {
    return res.status(500).send({ message: e.message });
  }
};

const getAllFollowedTags = async (req, res) => {
  try {
    const { organization } = req.params;
    const result = await FollowedTags.find({ organization })
      .sort({ createdAt: -1 })
      .populate('tags');
    return res.status(200).json(result);
  } catch (e) {
    return res.status(500).send({ message: e.message });
  }
};

const deleteFollowedTags = async (req, res) => {
  try {
    const { id } = req.params;
    const { organization } = req.user;
    const result = await FollowedTags.deleteOne({
      organization,
      _id: id,
    }).populate('tags');
    return res.status(200).json(result);
  } catch (e) {
    return res.status(500).send({ message: e.message });
  }
};

const editFollowedTags = async (req, res) => {
  try {
    const { id } = req.params;
    const { organization } = req.user;
    const { tags } = req.body;
    const result = await FollowedTags.findOneAndUpdate(
      {
        organization,
        _id: id,
      },
      { tags },
      { new: true, upsert: true },
    ).populate('tags');
    return res.status(200).json(result);
  } catch (e) {
    return res.status(500).send({ message: e.message });
  }
};

module.exports = {
  getAll,
  create,
  getAllDefaultTags,
  searchUserTags,
  saveTag,
  trendingTags,
  saveFollowedTags,
  getAllFollowedTags,
  deleteFollowedTags,
  editFollowedTags,
};
