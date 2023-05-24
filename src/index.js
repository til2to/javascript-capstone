import './style.css';
import homepageView from './modules/homeView.js';
import getAllRockets from './modules/rocketsApi.js';

const rocketsContainer = document.querySelector('.rockets-container');

// validate if local storage has data associated with rocketData key
if (JSON.parse(localStorage.getItem('rocketData')) === null || JSON.parse(localStorage.getItem('rockData')) === undefined) {
  localStorage.setItem('rocketData', JSON.stringify([]));
}

let rockets = JSON.parse(localStorage.getItem('rocketData'));

// When rockets int the local storage is empty
document.addEventListener('DOMContentLoaded', () => {
  const showMessage = (message) => {
    const messageElement = document.createElement('div');
    messageElement.id = 'no-rockets';
    messageElement.textContent = message;
    rocketsContainer.appendChild(messageElement);
  };

  if (!rockets === 0) showMessage('waiting');
});

// get data from local storage
const getDataFromLocalStorage = async (key) => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (error) {
    throw new Error('Error retrieving data:', error);
  }
};

// wait for the data from the local storage:
(async () => {
  try {
    const data = await getDataFromLocalStorage('rocketsData');
    rockets = data;
  } catch (error) {
    throw new Error(error.message);
  }
})();

// all rockets 🚀🚀
getAllRockets();

// get rocket🚀 counts from the local storage and update the ui menu item
const getRocketCount = () => {
  const rocketsMenuItem = document.getElementById('rocketsMenuItem');
  const rocketsCount = rockets.length;
  rocketsMenuItem.innerHTML = `Rockets (${rocketsCount})`;
};

// Call the getRocketCount() after fetching the data from local storage:
getRocketCount(); // 🚀🚀

homepageView(rockets);
