import { countries, sectors } from './suggestionsData';
import { Path } from '../../models/Path';

const suggestFromCountry = member => new Promise((resolve, reject) => Path.find({}).then((res) => {
  resolve(res.filter(
    (e) => {
      const suggestedCountry = new Set(countries.filter(x => x[e.name] === 'Yes').map(y => y.country));
      const memberCountries = new Set(member.countries.map(x => x.name));

      return [...suggestedCountry].filter(x => memberCountries.has(x)).length > 0;
    },
  ).map(e => e.id));
}).catch(err => reject(err)));

const suggestSdgsFromCountry = member => new Promise((resolve, reject) => Path.find({}).then((res) => {
  resolve(res.filter(
    (e) => {
      const suggestedSdgsCountry = new Set(countries.filter(x => x[e.name] === 'Yes').map(y => y.country));

      return [...suggestedSdgsCountry].length > 0;
    },
  ).map(e => e.id));
}).catch(err => reject(err)));

const suggestFromSectors = member => new Promise((resolve, reject) => Path.find({}).then((res) => {
  resolve(res.filter(
    (e) => {
      const suggestedIndustries = new Set(sectors.filter(x => x[e.name] === 'Yes').map(y => y.Industry));
      const memberIndustries = new Set(member.industries.map(x => x.name));

      return [...suggestedIndustries].filter(x => memberIndustries.has(x)).length > 0;
    },
  ).map(e => e.id));
}).catch(err => reject(err)));

module.exports = {
  suggestFromCountry,
  suggestSdgsFromCountry,
  suggestFromSectors,
};
