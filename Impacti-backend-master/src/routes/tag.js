import express from 'express';

const {
  getAll,
  create,
  getAllDefaultTags,
  searchUserTags,
  trendingTags,
  saveFollowedTags,
  getAllFollowedTags,
  deleteFollowedTags,
  editFollowedTags,
} = require('../components/tag');

const router = express.Router({ mergeParams: true });

router.get('/', getAll);
router.post('/', create);
router.get('/default', getAllDefaultTags);
router.get('/search/:search', searchUserTags);
router.get('/trending', trendingTags);
router.get('/follow/:organization', getAllFollowedTags);
router.post('/follow', saveFollowedTags);
router.delete('/follow/:id', deleteFollowedTags);
router.post('/follow/:id', editFollowedTags);

module.exports = router;
