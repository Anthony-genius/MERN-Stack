const mongoose = require('mongoose');

const { industries } = require('./industries');
const { sectors } = require('./sectors');
const { paths, destinations } = require('./destinations');
const { countries, sdgsObj } = require('./countries');
const { sdgs } = require('./sdgs');
const { baseAssessmentFocuses } = require('./baseAssessmentFocuses');
const { countrySdgs } = require('./countrySdgs');
const { currencies } = require('./currencies');
const { types } = require('./organizationTypes');
const { capacities } = require('./capacity');
const { tabs } = require('./tabs');
const { tags } = require('./tags');
const { drivers } = require('./drivers');
const { stakeholders } = require('./stakeholders');

const { getConfig } = require('../config/config');

const { Industry } = require('../models/Industry');
const { Sector } = require('../models/Sector');
const { Country } = require('../models/Country');
const { Currency } = require('../models/Currency');
const { Capacity } = require('../models/Capacity');
const { OrganizationType } = require('../models/OrganizationType');
const { Path } = require('../models/Path');
const { Destination } = require('../models/Destination');
const { Tab } = require('../models/Tab');
const { Tag } = require('../models/Tag');
const { Sdg } = require('../models/Sdg');
const { CountrySdg } = require('../models/CountrySdg');
const { Driver } = require('../models/Driver');
const { Stakeholder } = require('../models/Stakeholder');
const { BaseAssessmentFocus } = require('../models/BaseAssessmentFocus');

mongoose.connect(
  getConfig('connectionString'),
  {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
); // connect to database
mongoose.Promise = global.Promise;

Promise.all([
  ...industries.map(e => Industry.update({ name: e.name }, e, { upsert: true })),
  ...capacities.map(e => Capacity.update({ name: e.name }, e, { upsert: true })),
  ...drivers.map(e => Driver.update({ name: e.name }, e, { upsert: true })),
  ...stakeholders.map(e => Stakeholder.update({ name: e.name }, e, { upsert: true })),
  ...types.map(e => OrganizationType.update({ name: e.name }, e, { upsert: true })),
  ...currencies.map(e => Currency.update({ shortName: e.shortName }, e, { upsert: true })),
  ...sdgs.map(e => Sdg.update({ shortName: e.shortName }, e, { upsert: true })),
  ...countrySdgs.map(e => CountrySdg.update({ country: e.country }, e, { upsert: true })),
  ...sectors.map((e, i) =>
    Sector.findOneAndUpdate({ name: e.name }, e, {
      upsert: true,
      new: true,
    }).then(res =>
      Industry.find({ name: { $in: e.industriesNames } })
        .then((industries) => {
          res.industries = industries.map(x => x._id);
          return res.save();
        })
        .then(() =>
          Sdg.find({ shortName: { $in: e.opportunitySdgsNames } }).then((sdgs) => {
            res.opportunitySdgs = sdgs.map(x => x._id);

            return res.save();
          }),
        )
        .then(() =>
          Sdg.find({ shortName: { $in: e.leadershipSdgsNames } }).then((sdgs) => {
            res.leadershipSdgs = sdgs.map(x => x._id);

            return res.save();
          }),
        ),
    ),
  ),
  ...baseAssessmentFocuses.map((e, i) =>
    BaseAssessmentFocus
      .findOneAndUpdate({ focusArea: e.oldFocusArea ? e.oldFocusArea : e.focusArea }, e, {
        upsert: true,
        new: true,
      }).then((res) => {
        const sdgsNames = baseAssessmentFocuses[i].sdgId.map(sdg => `SDG${sdg}`);
        return Sdg.find({ shortName: { $in: sdgsNames } }).then((sdgs) => {
          res.sdgs = sdgs.map(x => x._id);

          return res
            .save()
            .then(() => {})
            .catch((err) => {
              console.log('oops', err);
            });
        });
      }),
  ),
  ...countries.map((e, i) =>
    Country.findOneAndUpdate({ name: e.name }, e, {
      upsert: true,
      new: true,
    }).then((res) => {
      const sdgsName = sdgsObj[i].map(e => e.shortName);
      return Sdg.find({ shortName: { $in: sdgsName } }).then((sdgs) => {
        res.sdgs = sdgs.map(x => x._id);
        return res
          .save()
          .then(() => {})
          .catch((err) => {
            console.log('oops', err);
          });
      });
    }),
  )])
  .then(() =>
    Promise.all(
      paths.map((e, i) =>
        Tag.findOneAndUpdate(
          { label: e.name ? e.name : e.tag, userCreated: false },
          { label: e.name, userCreated: false },
          { upsert: true, new: true },
        )),
    ),
  )
  .then(() =>
    Promise.all(
      tags.map((e, i) =>
        Tag.findOneAndUpdate(
          { label: e.oldName ? e.oldName : e.name, userCreated: false },
          { label: e.name, userCreated: false },
          { upsert: true, new: true },
        )),
    ),
  )
  .then(() =>
    Promise.all(
      [
        ...sectors.map(e => e.tag),
        ...sdgs.map(e => e.shortName),
        ...baseAssessmentFocuses.map(e => e.tag),
      ]
        .map(e => Tag.findOneAndUpdate(
          { label: e, userCreated: false },
          { label: e, userCreated: false },
          { upsert: true, new: true },
        )),
    ),
  )
  .then(() =>
    Promise.all(
      tabs.map(e => Tab.findOneAndUpdate({ name: e.name }, e, { upsert: true, new: true })),
    ),
  )
  .then(tabs =>
    Promise.all(
      paths.map(e =>
        Path.findOneAndUpdate({ name: e.name }, Object.assign({}, e, { tabs: e.tabs(tabs) }), {
          upsert: true,
          new: true,
        }),
      ),
    ),
  )
  .then(inserted =>
    Promise.all(
      destinations.map(e =>
        Destination.findOneAndUpdate(
          { name: e.name },
          Object.assign({}, e, { recommendedPaths: e.recommendedPaths(inserted) }),
          { upsert: true },
        ),
      ),
    ),
  )
  .then(() => {
    mongoose.connection.close();
  })
  .catch((err) => {
    console.log(err);
  });
