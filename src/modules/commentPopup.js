import { makeComment } from './apis.js';

// count the comments💬💬 of each rocket🚀
const commentCount = (commentData) => {
  if (!commentData || commentData === undefined) {
    return 0;
  }
  return commentData.length;
};

// render data of the homepage
const popupView = async (
  rocketId, rocketImage, rocketName, successRate, costPerLaunch, weightMass, rocketType,
  commentData,
) => {
  const popupsContainer = document.querySelector('.popups-container');
  let popup = '';
  popup += `
    <section class="each-popup">
      <div class='pop-container'>
        <section class='image-and-close-button'>
          <img src=${rocketImage} alt="" class="popup-item-image">
        </section>

        <section class='rocket-header-container'>
          <div class='rocket-description'>${rocketName}</div>
        </section>

        <section class='rocket-details'>
          <div class='items-properties'>
            <div class='items-properties each-property'>Success rate: ${successRate}</div>
            <div class='items-properties each-property'> Weight: ${weightMass}</div>
          </div>
          <div class='items-properties'>
            <div class='items-properties each-property'>Rocket type: ${rocketType}</div>
            <div class='items-properties each-property'>Cost per launch: ${costPerLaunch}</div>
          </div>
        </section>

        <section class='rocket-header-container'>
          <div class='rocket-description comments'>comments: ${commentCount(commentData)}</div>
        </section>

        <section class='message-details'>
        ${
/* eslint-disable camelcase */
  commentData.map(({ creation_date, username, comment }) => (
    `<span class='message'>
            ${creation_date} ${username}: ${comment}
          </span>`
  )).join('')}
      </section>

        <section class='rocket-header-container'>
          <div class='rocket-description comments'>Add a comment</div>
        </section>

        <form class='form-container'>
          <label for="name">Your Name:</label>
          <input type="text" id="name" name="name" required>
          <label for="message">Your Insights:</label>
          <textarea id="message" name="message" rows="4" cols="40" required></textarea>
          <div id="response-container"></div>
          <button type="submit" class="comments-button comment-popup">Comment</button>
        </form>
      </div>
    </section>
  `;

  popupsContainer.innerHTML = popup;

  const form = document.querySelector('.form-container');
  form.addEventListener('submit', async (e) => {
    // Get the form values
    const nameInput = document.querySelector('#name');
    const messageInput = document.querySelector('#message');
    const username = nameInput.value.trim();
    const comment = messageInput.value.trim();

    // Validate the form fields
    if (username.trim() === '' || comment.trim() === '') {
      e.preventDefault(); // Prevent form submission
      return;
    }

    // Handle the form submission
    e.preventDefault(); // Prevent form submission temporarily
    const responseDiv = document.createElement('div');
    responseDiv.textContent = await makeComment(rocketId, username, comment);
    responseDiv.classList.add('response-animation'); // Add the response animation class

    // Add the responseDiv to the response container
    const container = document.getElementById('response-container');
    container.innerHTML = ''; // Clear any previous response
    container.appendChild(responseDiv);

    // Clear the form fields
    form.reset();
  });
};

export default popupView;
