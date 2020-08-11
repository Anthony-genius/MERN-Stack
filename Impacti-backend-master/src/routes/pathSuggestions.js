import express from 'express';

import { setMemberFromPath } from '../components/member/index';
import {
  suggestedFromDestinations,
  suggestedFromCountries,
  suggestedFromIndustries,
  serialize,
} from '../components/member/suggestedPaths';

const router = express.Router({ mergeParams: true });

/**
 * @swagger
 * /api/internal/member/suggestions/:id:
 *   get:
 *     tags: [MEMBER]
 *     description: "Returns suggestions for member as array of ObjectIds"
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: List of ObjectIds representing suggested paths
 */
router.get('/:id',
  setMemberFromPath,
  suggestedFromDestinations,
  suggestedFromCountries,
  suggestedFromIndustries,
  serialize,
);

module.exports = router;
