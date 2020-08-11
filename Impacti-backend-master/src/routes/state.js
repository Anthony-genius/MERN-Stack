import express from 'express';

const { genericSuccess, genericError } = require('../middleware/genericResponses');
const { createState, updateState, getState } = require('../components/user/state');

const router = express.Router({ mergeParams: true });

router.post('/', (req, res) => {
  createState(req.user.id, req.body.memberId).then(
    () => genericSuccess(req, res),
    () => genericError(req, res),
  );
});

router.post('/:id', (req, res) => {
  updateState(req.params.id, req.body.stage, req.body.step).then(
    () => genericSuccess(req, res),
    () => genericError(req, res),
  );
});

router.get('/:id', (req, res) => {
  getState(req.params.id).then((state) => {
    res.send(200, state);
  });
});

module.exports = router;
