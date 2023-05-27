/**
 * @jest-environment jsdom
*/
import getRocketCount from './src/index.js';

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key],
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('returns the correct rocket count', () => {
  beforeEach(() => {
    localStorageMock.clear();
    const spaceX = [
      { rocket_id: 'falcon1' },
    ];
    localStorageMock.setItem('rocketData', JSON.stringify(spaceX));
  });

  test('get the length of the rockets in the local storage', () => {
    // Arrange or Set up initial rockets array
    const rockets = [
      { index: 1, description: 'Rocket 1' },
      { index: 2, description: 'Rocket 2' },
      { index: 3, description: 'Rocket 3' },
    ];

    // Retrieve local storage
    const updatedRockets = JSON.parse(localStorageMock.getItem('rocketData')) || [];

    // Set rockets array in local storage
    localStorageMock.setItem('rocketData', JSON.stringify([...updatedRockets, ...rockets]));

    const expectedLength = 4;

    // Act or Call getRocketCount function
    const rocketCount = getRocketCount();

    // Assert or Verify the rocket count
    expect(rocketCount).toEqual(expectedLength);
  });
});
