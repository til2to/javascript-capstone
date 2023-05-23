import './style.css';
import homepageView from './modules/homeView.js';
import { getAllRockets } from './modules/rocketsApi';

const rocketsContainer = document.querySelector('.rockets-container');
const likeButton = document.querySelector('.like-button');
const likeIcons = document.querySelectorAll('.like-and-icon i');

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

getAllRockets();
homepageView(rockets);

// likeButton.addEventListener('click', () => {
//   likeButton.classList.toggle('liked');
// });

// button.addEventListener('click', () => {
//   console.log("clicked");
//   getAllRockets();
// })

