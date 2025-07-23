module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-navigation|@react-native|react-native-sqlite-storage|react-native-gesture-handler|react-native-screens|react-native-safe-area-context)/)',
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};
