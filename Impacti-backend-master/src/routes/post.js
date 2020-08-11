import express from 'express';

const {
  get,
  getAll,
  post,
  update,
  deletePost,
  togglePostLike,
} = require('../components/post');

const router = express.Router({ mergeParams: true });

router.post('/', post);
router.put('/:id', update);
router.get('/', getAll);
router.get('/:id', get);
router.delete('/:id', deletePost);
router.post('/like/:id', togglePostLike);

module.exports = router;
