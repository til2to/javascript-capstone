/**
 * @jest-environment jsdom
 */

import popupView from './src/index.js';

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: jest.fn((key) => store[key]),
    setItem: jest.fn((key, value) => {
      store[key] = value.toString();
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

test('renders the popup view correctly', async () => {
  // Clear localStorage and set up commentData
  localStorageMock.clear();
  const commentData = [
    { rocketId: 'falcon1' },
    { commentData: '' },
  ];
  localStorageMock.setItem('popups-container', JSON.stringify(commentData));

  // Call the popupView function
  await popupView();

  // Write your assertions here to verify the expected HTML structure and behavior
  // ...

  // Clean up any changes made to the document or global objects
  document.body.innerHTML = '';
});
