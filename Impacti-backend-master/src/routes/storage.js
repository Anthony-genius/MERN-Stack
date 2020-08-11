import express from 'express';

const { genericSuccess, genericError } = require('../middleware/genericResponses');
const { addToStorage } = require('../components/user/storage');

const router = express.Router({ mergeParams: true });

const isBodyValid = body => Array.isArray(body)
  && body.map(b => !!b.key && !!b.value)
    .reduce((p, n) => p && n, true);


/**
 * @swagger
 * /api/internal/me/storage:
 *   patch:
 *     tags: [USER]
 *     description: Store some user related objects (key, value)
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: authentication
 *         description: JWT used to recognize user
 *         in: header
 *         required: true
 *         type: string
 *       - name: Object[]
 *         description: "[ { key: 'someKey', value: 'someValue' } ]"
 *         required: true
 *         type: string
 *         in: formData
 *     responses:
 *       200:
 *         description: generic success message
 *       400:
 *         description: generic error message, returned when body is in incorrect format
 */    
router.patch('/', (req, res) => {
  if (!isBodyValid(req.body)) {
    genericError(req, res);
    return;
  }

  addToStorage(req.user.id)(req.body, req.user.storage)
    .then(
      () => genericSuccess(req, res),
      () => genericError(req, res),
    );
});

/**
 * @swagger
 * /api/internal/me/storage:
 *   get:
 *     tags: [USER]
 *     description: Get user's storage in an object format
 *     parameters:
 *       - name: authentication
 *         description: JWT used to recognize user
 *         in: header
 *         required: true
 *         type: string
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: storage object
 *         schema:
 *           type: object
 *           properties:
 *            someKey:
 *              type: string
 *              description: User defined value.
 *            someOtherKey:
 *              type: string
 *              description: Some other user defined value.
 */    
router.get('/', (req, res) => {
  res.send(200, req.user.storage || {});
});

module.exports = router;
