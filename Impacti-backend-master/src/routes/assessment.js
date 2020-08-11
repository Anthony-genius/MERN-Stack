import express from 'express';

const { setMemberFromToken, serialize } = require('../components/member/index');

const router = express.Router({ mergeParams: true });

/**
 * @swagger
 * /api/internal/assessment:
 *   get:
 *     tags: [ASSESSMENT]
 *     description: Returns root element of assessment members
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: authentication
 *         description: JWT used to recognize user
 *         in: header
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Returns the tree of organization structure for currently logged in user
 */
router.get('/', setMemberFromToken, serialize);

module.exports = router;
