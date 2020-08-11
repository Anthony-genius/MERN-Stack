const fixtures = require('node-mongoose-fixtures');
const mongoose = require('mongoose');

const { loadIndustries } = require('./industries');
const { loadSectors } = require('./sectors');
const { loadPathsAndDestinations } = require('./destinations');
const { countries } = require('./countries');
const { loadCountries } = require('./countries');
const { baseAssessmentFocuses } = require('./baseAssessmentFocuses');
const { loadBaseAssessmentFocuses } = require('./baseAssessmentFocuses');
const { currencies } = require('./currencies');
const { types } = require('./organizationTypes');
const { capacities } = require('./capacity');
const { tabs } = require('./tabs');

const { getConfig } = require('../config/config');

const { Industry } = require('../models/Industry');
const { Sector } = require('../models/Sector');
const { Country } = require('../models/Country');
const { Currency } = require('../models/Currency');
const { Capacity } = require('../models/Capacity');
const { OrganizationType } = require('../models/OrganizationType');
const { Path } = require('../models/Path');
const { Tab } = require('../models/Tab');
const { Destination } = require('../models/Destination');
const { Sdg } = require('../models/Sdg');

mongoose.connect(
  getConfig('connectionString'),
  {
    useMongoClient: true,
    useFindAndModify: false,
  },
); // connect to database
mongoose.Promise = global.Promise;
loadCountries(mongoose)
  .then(() => loadPathsAndDestinations(mongoose))
  .then(() => {
    fixtures(
      {
        Country: countries,
      },
      mongoose,
      () => {
        mongoose.connection.close();
      },
    );
  });

loadBaseAssessmentFocuses(mongoose).then(() => {
  fixtures(
    {
      BaseAssessmentFocus: baseAssessmentFocuses,
    },
    mongoose,
    () => {
      mongoose.connection.close();
    },
  );
});

loadIndustries(mongoose).then(() =>
  loadSectors(mongoose)
    .then(() => loadPathsAndDestinations(mongoose))
    .then(() => {
      fixtures(
        {
          Country: countries,
          Currency: currencies,
          OrganizationType: types,
          Capacity: capacities,
          Tab: tabs,
        },
        mongoose,
        () => {
          mongoose.connection.close();
        },
      );
    }),
);
