import express from 'express';

const { get, getAll, comment } = require('../components/comment');

const router = express.Router({ mergeParams: true });

router.post('/', comment);
router.get('/', getAll);
router.get('/:id', get);

module.exports = router;
