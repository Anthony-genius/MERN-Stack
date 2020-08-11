import { suggestFromCountry, suggestFromSectors } from '../pathSuggestions/suggestionsFinder';
import { databaseFail } from '../../helpers/errors';

const suggestedFromDestinations = (req, res, next) => {
  req.fromDestinations = req.member.destinations.reduce(
    (acc, e) => [
      ...acc,
      ...e.recommendedPaths,
    ], [],
  );
  next();
};

const suggestedFromCountries = (req, res, next) => {
  suggestFromCountry(req.member).then(
    (result) => {
      req.fromCountries = result;
      next();
    },
  ).catch(() => {
    res.status(databaseFail.status).send({ message: databaseFail.message });
  });
};

const suggestedFromIndustries = (req, res, next) => {
  suggestFromSectors(req.member).then((paths) => {
    req.fromIndustries = paths;
    next();
  }).catch(() => {
    res.status(databaseFail.status).send({ message: databaseFail.message });
  });
};

const serialize = (req, res) => {
  res.status(200).send({
    paths: [...new Set(
      [
        ...req.fromDestinations.map(e => e.toString()),
        ...req.fromCountries.map(e => e.toString()),
        ...req.fromIndustries.map(e => e.toString()),
      ],
    )],
  });
};

module.exports = {
  suggestedFromDestinations,
  suggestedFromCountries,
  suggestedFromIndustries,
  serialize,
};
