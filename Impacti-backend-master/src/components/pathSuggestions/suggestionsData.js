const parse = require('csv-parse/lib/sync');
const fs = require('fs');

const countries = fs.readFileSync(`${__dirname}/../../../src/fixtures/customerData/country_suggestions.csv`).toString();
const countriesSdgs = fs.readFileSync(`${__dirname}/../../../src/fixtures/customerData/sdgs_by_country.csv`).toString();
const sectors = fs.readFileSync(`${__dirname}/../../../src/fixtures/customerData/sector_suggestions.csv`).toString();

const countrieJson = parse(countries, { columns: true });
const countrieSdgJson = parse(countriesSdgs, { columns: true });
const sectorsJson = parse(sectors, { columns: true });

module.exports = {
  countries: countrieJson,
  countriesSdgs: countrieSdgJson,
  sectors: sectorsJson,
};
