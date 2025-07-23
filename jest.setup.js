import 'react-native-gesture-handler/jestSetup';

jest.mock('react-native-sqlite-storage', () => {
  return {
    DEBUG: jest.fn(),
    enablePromise: jest.fn(),
    openDatabase: jest.fn().mockReturnValue({
      executeSql: jest.fn().mockResolvedValue([
        {
          rows: {
            length: 0,
            item: jest.fn(),
          },
          insertId: 1,
        },
      ]),
      close: jest.fn().mockResolvedValue(true),
    }),
  };
});

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
      goBack: jest.fn(),
      setOptions: jest.fn(),
    }),
    useRoute: () => ({
      params: {},
    }),
    useFocusEffect: jest.fn(),
  };
});