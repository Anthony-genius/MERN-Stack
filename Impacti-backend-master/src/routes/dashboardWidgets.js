import express from 'express';

const {
  setPathFromQuery,
  setMemberFromQuery,
  findProperDestinations,
} = require('../components/dashboardWidgets/index');

const { calculateProgress } = require('../components/dashboardWidgets/progressOnYourJourney');
const { findReports } = require('../components/dashboardWidgets/destinationOutputs');
const { findAchievements } = require('../components/dashboardWidgets/achievements');
const { getCommitments } = require('../components/dashboardWidgets/commitmentTracker');

const router = express.Router({ mergeParams: true });

/**
 * @swagger
 * /api/internal/dashboard/widgets/journey_progress:
 *   get:
 *     tags: [DASHBOARD]
 *     description: "Returns estimated progress towards each of members
 *     destinations related to given path"
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: authentication
 *         description: JWT used to recognize user
 *         in: header
 *         required: true
 *         type: string
 *       - name: member
 *         description: Id of member
 *         required: true
 *         type: string
 *         in: query
 *       - name: path
 *         description: "Id of path. If null, all destinations for member will be returned"
 *         type: string
 *         in: query
 *     responses:
 *       200:
 *         description: Array of values supported by the database in given area
 */
router.get('/journey_progress', setPathFromQuery, setMemberFromQuery, findProperDestinations, calculateProgress);

/**
 * @swagger
 * /api/internal/dashboard/widgets/destination_outputs:
 *   get:
 *     tags: [DASHBOARD]
 *     description: "Returns a list of most recent reports for destinations
 *     related to path and member"
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: authentication
 *         description: JWT used to recognize user
 *         in: header
 *         required: true
 *         type: string
 *       - name: member
 *         description: Id of member
 *         required: true
 *         type: string
 *         in: query
 *       - name: path
 *         description: "Id of path. If null, all destinations for member will be returned"
 *         type: string
 *         in: query
 *     responses:
 *       200:
 *         description: Array of objects describing reports
 */
router.get('/destination_outputs', setPathFromQuery, setMemberFromQuery, findProperDestinations, findReports);

/**
 * @swagger
 * /api/internal/dashboard/widgets/achievements:
 *   get:
 *     tags: [DASHBOARD]
 *     description: "Returns a list of users achievements
 *     related to path and member"
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: authentication
 *         description: JWT used to recognize user
 *         in: header
 *         required: true
 *         type: string
 *       - name: member
 *         description: Id of member
 *         required: true
 *         type: string
 *         in: query
 *       - name: path
 *         description: "Id of path. If null, all destinations for member will be returned"
 *         type: string
 *         in: query
 *     responses:
 *       200:
 *         description: Array of objects describing reports
 */
router.get('/achievements', setPathFromQuery, setMemberFromQuery, findProperDestinations, findAchievements);

/**
 * @swagger
 * /api/internal/dashboard/widgets/commitment_tracker:
 *   get:
 *     tags: [DASHBOARD]
 *     description: "Returns estimated progress towards each of members
 *     commitments related to given path"
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: authentication
 *         description: JWT used to recognize user
 *         in: header
 *         required: true
 *         type: string
 *       - name: member
 *         description: Id of member
 *         required: true
 *         type: string
 *         in: query
 *       - name: path
 *         description: "Id of path. If null, all destinations for member will be returned"
 *         type: string
 *         in: query
 *     responses:
 *       200:
 *         description: Array of values supported by the database in given area
 */
router.get('/commitment_tracker', setPathFromQuery, setMemberFromQuery, findProperDestinations, getCommitments);

module.exports = router;
