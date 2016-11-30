module.exports = {
  'plugins': [
    'flowtype',
    'mocha',
  ],
  'extends': [
    'airbnb',
  ],
  'parser': 'babel-eslint',
  'parserOptions': {
    'ecmaversion': 6,
    'ecmaFeatures': {
      'experimentalObjectRestSpread': true,
    },
  },
  'env': {
    'browser': true,
    'node': true,
    'mocha': true,
  },
  'rules': {
    'no-trailing-spaces': [
      'error',
      {
        'skipBlankLines': true,
      },
    ],
    'react/jsx-filename-extension': [
      'warn',
      {
        'extensions': ['.js', '.jsx'],
      },
    ],
    'mocha/no-exclusive-tests': 'error',
  },
};
