const ObjectId = require('mongoose').Schema.Types.ObjectId;

const { Country } = require('../models/Country');
const { Sdg } = require('../models/Sdg');

const { countries } = require('country-data');

const { countriesSdgs } = require('../components/pathSuggestions/suggestionsData.js');

const newCountries = countriesSdgs.filter(a => countries.all);

const countryObjects = newCountries.map(e => ({ name: e.name }));

const sdgs = countriesSdgs.map(e =>
  Object.keys(e)
    .map(k => e[k])
    .filter((v, i) => v && i != 0),
);


const sdgObjects = sdgs.map(f => f.map(j => ({ shortName: j })));


let resolved = 0;

module.exports = {
  loadCountries: mongoose =>
    new Promise((resolve) => {
      Country.insertMany(countryObjects).then((result) => {
        result.forEach((e, i) => {
          sdgObjects[i].forEach((x, n) => {
            const sdg = new Sdg(x);
            sdg.save().then((a) => {
              e.sdgs = [...e.sdgs, a.id];
              if (e.sdgs.length === sdgObjects[i].length) {
                e.save()
                  .then((_) => {
                    resolved++;
                    if (resolved === sdgs.length - 1) {
                      resolve(true);
                    }
                  })
                  .catch((err) => {
                    console.log('oops', err);
                  });
              }
            });
          });
        });
      });
    }),
  sdgsObj: sdgObjects,
  countries: countryObjects,
};
