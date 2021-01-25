const { defaults } = require('jest-config');

module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@?react-navigation)',
  ],
  transform: {
    '^.+\\.(js|ts|tsx)$': 'babel-jest',
  },
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'd.ts'],
};
