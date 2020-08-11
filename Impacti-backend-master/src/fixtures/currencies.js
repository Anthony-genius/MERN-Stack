const { currencies } = require('country-data');

module.exports = {
  currencies: currencies
    .all
    .filter(e => e.name.indexOf('(') === -1) // this eliminates some currencies which are not used in daily exchange
    .filter(e => e.code !== 'XXX') // this code corresponds to "No currency"
    .filter(e => e.code !== 'XTS') // this code corresponds to "Test currency"
    .map(
      e => ({ name: e.name, shortName: e.code }),
    ),
};
