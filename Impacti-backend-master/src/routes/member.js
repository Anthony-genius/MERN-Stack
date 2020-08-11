import express from 'express';

const {
  setMemberFromPath,
  get,
  getAll,
  save,
  update,
  serialize,
  checkRootMember,
  removeMember,
  checkUserIsOwner,
} = require('../components/member/index');
const { addPaths, removePaths } = require('../components/member/path');
const { addDestinations, removeDestinations } = require('../components/member/destination');
const { genericSuccess } = require('../middleware/genericResponses');

const router = express.Router({ mergeParams: true });

/**
 * @swagger
 * /api/internal/member:
 *   post:
 *     tags: [MEMBER]
 *     description: "Saves a new member under users organization.
 *     If parent parameter is not null, the member will be created as a child of parent one.
 *     Otherwise the member will be saved as root member for current users organization"
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: authentication
 *         description: JWT used to recognize user
 *         in: header
 *         required: true
 *         type: string
 *       - name: name
 *         description: members name
 *         in: formData
 *         required: true
 *         type: string
 *       - name: currency
 *         description: Id of currency object
 *         in: formData
 *         required: true
 *         type: string
 *       - name: capacity
 *         description: Id of capacity object
 *         in: formData
 *         required: true
 *         type: string
 *       - name: parent
 *         description: members parent. If null it will be considered root of organization structure
 *         in: formData
 *         required: false
 *         type: string
 *       - name: workersNumber
 *         description: number of workers in the member
 *         in: formData
 *         required: true
 *         type: integer
 *       - name: types
 *         description: Types of organization, given as an array of object ids
 *         required: true
 *         in: formData
 *         type: string
 *       - name: countries
 *         description: Selected countries, given as an array of object ids
 *         required: true
 *         in: formData
 *         type: string
 *       - name: sectors
 *         description: Selected sectors, given as an array of object ids
 *         required: true
 *         in: formData
 *         type: string
 *       - name: industries
 *         description: Selected industries, given as an array of object ids
 *         required: true
 *         in: formData
 *         type: string
 *     responses:
 *       200:
 *         description: REST representation of a member
 *       400:
 *         description: Request failed due to missing important data or nonexistent refs to objects
 */
router.post('/', save, checkRootMember, serialize);

/**
 * @swagger
 * /api/internal/member/:id:
 *   post:
 *     tags: [MEMBER]
 *     description: "Updates member by ID"
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: authentication
 *         description: JWT used to recognize user
 *         in: header
 *         required: true
 *         type: string
 *       - name: name
 *         description: members name
 *         in: formData
 *         required: true
 *         type: string
 *       - name: currency
 *         description: Id of currency object
 *         in: formData
 *         required: true
 *         type: string
 *       - name: capacity
 *         description: Id of capacity object
 *         in: formData
 *         required: true
 *         type: string
 *       - name: parent
 *         description: members parent. If null it the node will not be found!
 *         in: formData
 *         required: false
 *         type: string
 *       - name: workersNumber
 *         description: number of workers in the member
 *         in: formData
 *         required: true
 *         type: integer
 *       - name: types
 *         description: Types of organization, given as an array of object ids
 *         required: true
 *         in: formData
 *         type: string
 *       - name: countries
 *         description: Selected countries, given as an array of object ids
 *         required: true
 *         in: formData
 *         type: string
 *       - name: sectors
 *         description: Selected sectors, given as an array of object ids
 *         required: true
 *         in: formData
 *         type: string
 *       - name: industries
 *         description: Selected industries, given as an array of object ids
 *         required: true
 *         in: formData
 *         type: string
 *       - name: baseAssessmentAnswer
 *         description: Selected baseAssessmentAnswers, given as an array of object ids
 *         required: true
 *         in: formData
 *         type: string
 *     responses:
 *       200:
 *         description: REST representation of a member
 *       400:
 *         description: Request failed due to missing important data or nonexistent refs to objects
 */
router.post('/:id', checkUserIsOwner, update, serialize);

/**
 * @swagger
 * /api/external/member/:id:
 *   delete:
 *     tags: [MEMBER]
 *     description: "Removes the member"
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Success message - the node was deleted
 *       400:
 *         description: Database error, no member specified, or member does not exist
 */
router.delete('/:id', setMemberFromPath, removeMember, genericSuccess);

/**
 * @swagger
 * /api/external/member/:id/path:
 *   patch:
 *     tags: [MEMBER]
 *     description: "Modifies paths selected for member. Accepts both added and removed paths"
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: add
 *         description:  array of ObjectIds of path that are to be added
 *         in: formData
 *         required: false
 *         type: string
 *       - name: remove
 *         description: array of ObjectIds of path that are to be removed
 *         in: formData
 *         required: false
 *         type: string
 *       - name: propagate
 *         description: If set to TRUE will apply change to each node in subtree with member as root
 *         required: true
 *         type: boolean
 *         in: formData
 *     responses:
 *       200:
 *         description: REST representation of a member
 *       400:
 *         description: There is no path with given id
 */
router.patch('/:id/path', setMemberFromPath, removePaths, addPaths, serialize);

/**
 * @swagger
 * /api/internal/member/:id/destination:
 *   patch:
 *     tags: [MEMBER]
 *     description: "Modifies destinations selected for member.
 *     Accepts both added and removed paths"
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: add
 *         description: array of ObjectIds of destinations that are to be added
 *         in: formData
 *         required: false
 *         type: string
 *       - name: remove
 *         description: array of ObjectIds of destinations that are to be removed
 *         in: formData
 *         required: false
 *         type: string
 *       - name: propagate
 *         description: If set to TRUE will apply change to each node in subtree with member as root
 *         required: true
 *         type: boolean
 *         in: formData
 *     responses:
 *       200:
 *         description: REST representation of a member
 *       400:
 *         description: There is no destination with given id
 */
router.patch('/:id/destination', setMemberFromPath, removeDestinations, addDestinations, serialize);

router.get('/:id', checkUserIsOwner, get, serialize);
router.get('/', getAll, serialize);

module.exports = router;
