/**
 * @jest-environment jsdom
*/
import { commentCount, count } from './src/modules/commentPopup.js';

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
    if (localStorageMock.getItem('commentCounter') === null || localStorageMock.getItem('commentCounter') === undefined) {
      localStorageMock.setItem('commentCounter', JSON.stringify(count));
    }
  });
  test('return comment count', async () => {
    // Set the initial value in local storage
    localStorageMock.setItem('commentCounter', JSON.stringify(count));

    // Call the commentCount function and await the result
    const counter = await commentCount();

    // Assert or Verify the rocket count
    expect(counter).toEqual(count);
  });
});