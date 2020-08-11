const mongoose = require('mongoose');

const { getConfig } = require('../../config/config');

const { Industry } = require('../../models/Industry');
const { Sector } = require('../../models/Sector');
const { Country } = require('../../models/Country');
const { Currency } = require('../../models/Currency');
const { Capacity } = require('../../models/Capacity');
const { OrganizationType } = require('../../models/OrganizationType');
const { Path } = require('../../models/Path');
const { Destination } = require('../../models/Destination');
const { Tab } = require('../../models/Tab');
const { Sdg } = require('../../models/Sdg');
const { CountrySdg } = require('../../models/CountrySdg');
const { Driver } = require('../../models/Driver');
const { BaseAssessmentAnswer } = require('../../models/BaseAssessmentAnswer');
const { BaseAssessmentFocus } = require('../../models/BaseAssessmentFocus');

mongoose.connect(
  getConfig('connectionString'),
  {
    useMongoClient: true,
    useFindAndModify: false,
  },
); // connect to database
mongoose.Promise = global.Promise;

Industry.remove({})
  .then(() => Sector.remove({}))
  .then(() => Country.remove({}))
  .then(() => Currency.remove({}))
  .then(() => Capacity.remove({}))
  .then(() => OrganizationType.remove({}))
  .then(() => Path.remove({}))
  .then(() => Destination.remove({}))
  .then(() => Tab.remove({}))
  .then(() => Sdg.remove({}))
  .then(() => CountrySdg.remove({}))
  .then(() => Driver.remove({}))
  .then(() => BaseAssessmentAnswer.remove({}))
  .then(() => BaseAssessmentFocus.remove({}))
  .then(() => mongoose.connection.close())
  .catch(e => console.log(e));
