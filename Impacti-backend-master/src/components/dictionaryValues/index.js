const keyMirror = require('keymirror');

const { Sector } = require('../../models/Sector');
const { Country } = require('../../models/Country');
const { Currency } = require('../../models/Currency');
const { Capacity } = require('../../models/Capacity');
const { OrganizationType } = require('../../models/OrganizationType');
const { Industry } = require('../../models/Industry');
const { Path } = require('../../models/Path');
const { Destination } = require('../../models/Destination');
const { Sdg } = require('../../models/Sdg');
const { CountrySdg } = require('../../models/CountrySdg');
const { Driver } = require('../../models/Driver');
const { Stakeholder } = require('../../models/Stakeholder');
const { BaseAssessmentFocus } = require('../../models/BaseAssessmentFocus');

const { valueNotSupported } = require('../../helpers/errors');

const SUPPORTED_TYPES = keyMirror({
  SECTOR: null,
  COUNTRY: null,
  CURRENCY: null,
  CAPACITY: null,
  ORGANIZATION_TYPE: null,
  INDUSTRY: null,
  PATH: null,
  DESTINATION: null,
  SDG: null,
  COUNTRY_SDG: null,
  DRIVER: null,
  STAKEHOLDER: null,
  BASE_ASSESSMENT_FOCUS: null,
});

const typeToModel = (type) => {
  switch (type) {
    case SUPPORTED_TYPES.SECTOR:
      return Sector;
    case SUPPORTED_TYPES.COUNTRY:
      return Country;
    case SUPPORTED_TYPES.CURRENCY:
      return Currency;
    case SUPPORTED_TYPES.CAPACITY:
      return Capacity;
    case SUPPORTED_TYPES.ORGANIZATION_TYPE:
      return OrganizationType;
    case SUPPORTED_TYPES.INDUSTRY:
      return Industry;
    case SUPPORTED_TYPES.PATH:
      return Path;
    case SUPPORTED_TYPES.DESTINATION:
      return Destination;
    case SUPPORTED_TYPES.SDG:
      return Sdg;
    case SUPPORTED_TYPES.COUNTRY_SDG:
      return CountrySdg;
    case SUPPORTED_TYPES.DRIVER:
      return Driver;
    case SUPPORTED_TYPES.STAKEHOLDER:
      return Stakeholder;
    case SUPPORTED_TYPES.BASE_ASSESSMENT_FOCUS:
      return BaseAssessmentFocus;
    default:
      return null;
  }
};

const loadData = (type) => {
  switch (type) {
    case SUPPORTED_TYPES.SECTOR:
      return Sector.find({})
        .populate('industries')
        .populate('leadershipSdgs')
        .populate('opportunitySdgs');
    case SUPPORTED_TYPES.COUNTRY_SDG:
      return CountrySdg.find({}).populate('countrySdgs');
    case SUPPORTED_TYPES.COUNTRY:
      return Country.find({}).populate('sdgs');
    case SUPPORTED_TYPES.DESTINATION:
      return Destination.find({}).populate('recommendedPaths');
    case SUPPORTED_TYPES.BASE_ASSESSMENT_FOCUS:
      return BaseAssessmentFocus.find({}).populate('sdgs');
    default:
      return typeToModel(type).find({});
  }
};

module.exports = {
  loadValues: type =>
    new Promise(
      (resolve, reject) =>
        (SUPPORTED_TYPES[type] ? resolve(loadData(type)) : reject(valueNotSupported)),
    ),
};
