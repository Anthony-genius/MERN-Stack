const mongoose = require('mongoose');

const { baseAssessmentFocuses } = require('./baseAssessmentFocuses');
const { tags } = require('./tags');
const { paths } = require('./destinations');
const { sdgs } = require('./sdgs');
const { sectors } = require('./sectors');

const { getConfig } = require('../config/config');

const { Tag } = require('../models/Tag');

mongoose.connect(getConfig('connectionString'), {
  useNewUrlParser: true,
  useUnifiedTopology: true
}); // connect to database
mongoose.Promise = global.Promise;

let tagTagsUpdated = 0;
let pathsTagsUpdated = 0;
let otherTagsUpdated = 0;

Promise.all(
  [
    ...sectors.map(e => e.tag),
    ...sdgs.map(e => e.shortName),
    ...baseAssessmentFocuses.map(e => e.tag)
  ].map(e =>
    Tag.findOneAndUpdate(
      { label: { $regex: new RegExp(e, 'i') } },
      { label: e, userCreated: false },
      { upsert: true, new: true }
    )
      .then(() => {
        otherTagsUpdated += 1;
      })
      .catch(err => {
        console.error(err);
        console.log(e);
      })
  )
)
  .then(() =>
    Promise.all(
      paths.map((e, i) =>
        Tag.findOneAndUpdate(
          {
            $or: [
              { label: { $regex: new RegExp(e.name ? e.name : e.tag, 'i') } },
              { label: { $regex: new RegExp(e.tag, 'i') } }
            ]
          },
          { label: e.name, userCreated: false },
          { upsert: true, new: true }
        )
          .then(() => {
            pathsTagsUpdated += 1;
          })
          .catch(err => {
            console.error(err);
            console.log(e);
          })
      )
    )
  )
  .then(() =>
    Promise.all(
      tags.map((e, i) =>
        Tag.findOneAndUpdate(
          {
            $or: [
              {
                label: {
                  $regex: new RegExp(e.oldName ? e.oldName : e.name, 'i')
                }
              },
              { label: new RegExp(e.name, 'i') }
            ]
          },
          { label: e.name, userCreated: false },
          { upsert: true, new: true }
        )
          .then(() => {
            tagTagsUpdated += 1;
          })
          .catch(err => {
            console.error(err);
            console.log(e);
          })
      )
    )
  )
  .then(() => {
    mongoose.connection.close();
    console.log(`tagTagsUpdated: ${tagTagsUpdated}`);
    console.log(`pathsTagsUpdated: ${pathsTagsUpdated}`);
    console.log(`otherTagsUpdated: ${otherTagsUpdated}`);
  })
  .catch(err => {
    console.log(err);
  });
