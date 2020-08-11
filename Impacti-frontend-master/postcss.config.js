const variables = require('./src/constants/oldInlineStyles') //eslint-disable-line

module.exports = {
  parser: 'postcss-safe-parser',
  plugins: {
    autoprefixer: {},
    'postcss-mixins': {},
    'postcss-nested': {},
    'postcss-simple-vars': {
      variables
    }
  }
}
