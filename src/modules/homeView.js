// render data of the homepage
const homepageView = (data) => {
  const rocketsContainer = document.querySelector('.rockets-container');
  let rockets = '';
  data.forEach((rocket) => {
    const rocketId = rocket.rocket_id
    const rocketName = rocket.rocket_name
    const rocketImage = rocket.flickr_images
    
    rockets += `
      <li class="each-rocket" id="${rocketId}}">
        <img src="${rocketImage}" alt="" class="list-item-image">
        <section class="item">
          <h3 class="rockec-name">${rocketName}</h3>
          <section class="like-and-icon">
            <i class="fa fa-heart" data-rocket-id="${rocketId}""></i>
            <div class="like-count" id="likeCount${rocketId}">likes</div>
          </section>
        </section>
        <section class="button-container">
          <button type="button" class="comments-button" data-rocket-id="${rocketId}">
            comment
          </button>
        </section>
      </li>
    `;
  });
  rocketsContainer.innerHTML = rockets;
  console.log(data)

  // Add event listener to toggle heart icon color and track the icon button clicked
  const likeIcons = document.querySelectorAll('.like-and-icon i');
  likeIcons.forEach((icon) => {
    icon.addEventListener('click', () => {
      const rocketId = icon.getAttribute('data-rocket-id');
      icon.classList.toggle('liked');
      console.log(rocketId)

      // Perform additional logic specific to the rocket with the given rocketId
      // Example: Update the like count for the specific rocket
      // updateLikeCount(rocketId);
    });
  });

  // track the comment button clicked
  const commentButtons = document.querySelectorAll('.comments-button');
  commentButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const rocketId = button.getAttribute('data-rocket-id');
      console.log(rocketId)

      // Perform additional logic specific to the rocket with the given rocketId
      // Example: Display comments for the specific rocket
      // displayComments(rocketId);
    });
  });
};

export default homepageView
