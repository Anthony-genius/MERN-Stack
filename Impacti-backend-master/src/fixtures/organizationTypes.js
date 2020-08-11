const defaults = [
  'Company',
  'Academic',
  'Business Association',
  'Labour Organization',
  'City',
  'Public Sector Organization',
  'Foundation',
  'NGO',
  'Other',
];

module.exports = { types: defaults.map(e => ({ name: e })) };
