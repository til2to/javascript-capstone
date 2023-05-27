import { getComments, makeComment } from './apis.js';

// get comment count from local storage
const count = JSON.parse(localStorage.getItem('commentCounter'));

// count the comments💬💬 of each rocket🚀
const commentCount = async () => JSON.parse(localStorage.getItem('commentCounter'));

// function render data of the homepage
const popupView = async (
  rocketId,
  rocketImage,
  rocketName,
  successRate,
  costPerLaunch,
  weightMass,
  rocketType,
  commentData,
) => {
  // Retrieve comment count asynchronously
  const commentCountValue = await commentCount();

  const popupsContainer = document.querySelector('.popups-container');
  let popup = '';

  // generate the markup with function to be able to update in real time.
  const generateCommentMarkup = (commentData) => commentData
    .map(({ creation_date, username, comment }) => `
        <span class='message'>
          ${creation_date} ${username}: ${comment}
        </span>`)
    .join('');

  popup += `
    <section class="each-popup">
      <div class='pop-container'>
        <section class='image-and-close-button'>
          <i class="fas fa-times-circle" id="modal-btn"></i> 
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
          <div class='rocket-description comment-count' id="commentCount${rocketId}">comments: ${commentCountValue}</div>
        </section>

        <section class='message-details'>
          ${generateCommentMarkup(commentData)}
        </section>
        <section class='rocket-header-container'>
          <div class='rocket-description comments'>Add a comment</div>
        </section>

        <form class='form-container'>
          <label for="name">Your Name:</label>
          <input type="text" id="name" name="name" required placeholder="Your name">

          <label for="message">Your Insights:</label>
          <textarea id="message" name="message" rows="4" cols="40" required placeholder="Your insights"></textarea>
          
          <div id="response-container"></div>

          <button type="submit" class="comments-button comment-popup">Comment</button>
        </form>
      </div>
    </section>
  `;

  popupsContainer.innerHTML = popup;

  // handle form submission
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

    // get the whole comments and update the ui
    const allComments = await getComments(rocketId);

    // update the comment view
    const messageDetails = document.querySelector('.message-details');
    messageDetails.innerHTML = generateCommentMarkup(allComments);

    // Update the comment count in the UI
    const updateCountElement = document.getElementById(`commentCount${rocketId}`);
    const latestCommentCount = await commentCount();
    updateCountElement.textContent = `comments: ${latestCommentCount}`;

    // Add the responseDiv to the response container
    const container = document.getElementById('response-container');
    container.innerHTML = ''; // Clear any previous response
    container.appendChild(responseDiv);

    // Clear the form fields
    form.reset();

    // Clear the responseDiv after 4 seconds
    setTimeout(() => {
      container.innerHTML = ''; // Clear the responseDiv
    }, 4000);
  });

  const modalClose = document.querySelector('#modal-btn');
  const modalContainer = document.querySelector('.popups-container');
  const homeContainer = document.querySelector('#home-container');

  // handle the closing button
  modalClose.addEventListener('click', () => {
    // hide the popup/modal container
    modalContainer.style.display = 'none';
    // show popupClose button
    homeContainer.style.filter = 'blur(0px)';
    window.location.reload();
  });
};

export { count, commentCount, popupView };
