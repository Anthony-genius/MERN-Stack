import express from 'express';

const { loadValues } = require('../components/dictionaryValues/index');
const {
  loadAllData,
  transformData,
  applyWidgetRules,
  appendDefaultPath,
  send,
} = require('../components/widgetsRules/index');

const router = express.Router({ mergeParams: true });

/**
 * @swagger
 * /api/internal/dictionaries:
 *   get:
 *     tags: [DICTIONARIES]
 *     description: Returns collections of specified types used in member definition
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: authentication
 *         description: JWT used to recognize user
 *         in: header
 *         required: true
 *         type: string
 *       - name: type
 *         description: "Type of dictionary value to be returned.
 *         Supported types are: [SECTOR, COUNTRY, CURRENCY, CAPACITY,
 *         ORGANIZATION_TYPE, DESTINATION, PATH]"
 *         required: true
 *         type: string
 *         in: query
 *     responses:
 *       200:
 *         description: Array of values supported by the database in given area
 */
router.get('/', (req, res) => {
  loadValues(req.query.type)
    .then((e) => { res.status(200).send(e); })
    .catch((e) => { res.status(e.status).send({ message: e.message }); });
});

/**
 * @swagger
 * /api/internal/dictionaries/widgets:
 *   get:
 *     tags: [DICTIONARIES]
 *     description: Returns list of all rules about displaying widgets based on app context
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: authentication
 *         description: JST used to recognize user
 *         in: header
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Success response
 *         schema:
 *           type: object
 *           properties:
 *            config:
 *              type: array
 *              description: User defined value.
 *
 */
router.get('/widgets', loadAllData, transformData, applyWidgetRules, appendDefaultPath, send);

module.exports = router;
