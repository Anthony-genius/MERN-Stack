import express from 'express';

const { loadValues } = require('../components/dictionaryValues/index');

const router = express.Router({ mergeParams: true });

/**
 * @swagger
 * /api/external/dictionaries:
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


module.exports = router;
