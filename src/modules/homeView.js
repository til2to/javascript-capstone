import { likeRocket, getLikes } from './apis.js';

// render data of the homepage
const homepageView = async (data) => {
  const rocketsContainer = document.querySelector('.rockets-container');
  let rockets = '';

  try {
    const likesData = await getLikes(); // Retrieve the likes data from the API
    const likesMap = new Map();

    /* eslint-disable camelcase */
    likesData.forEach(({ item_id, likes }) => {
      // Create a map of rocketId to likes count
      likesMap.set(item_id, likes);
    });

    data.forEach((rocket) => {
      /* eslint-disable camelcase */
      const rocketId = rocket.rocket_id;
      const rocketName = rocket.rocket_name;
      const rocketImage = rocket.flickr_images;
      // Get the likes count from the map, defaulting to 0 if not found
      const rocketLikes = likesMap.get(rocketId) || 0;

      // the rockets views 🚀🚀
      rockets += `
        <li class="each-rocket" id="${rocketId}}">
          <img src="${rocketImage}" alt="" class="list-item-image">
          <section class="item">
            <h3 class="rockec-name">${rocketName}</h3>
            <section class="like-and-icon">
              <i class="fa fa-heart" data-rocket-id="${rocketId}""></i>
              <div class="like-count" id="likeCount${rocketId}">${rocketLikes} likes</div>
            </section>
          </section>
          <section class="button-container">
            <button type="button" class="comments-button" data-rocket-id="${rocketId}">
              comments
            </button>
          </section>
        </li>
      `;
    });
    rocketsContainer.innerHTML = rockets;

    // Add event listener to toggle heart icon color and track the icon button clicked
    const likeIcons = document.querySelectorAll('.like-and-icon i');
    likeIcons.forEach((icon) => {
      icon.addEventListener('click', async () => {
        const rocketId = icon.getAttribute('data-rocket-id');
        icon.classList.toggle('liked');

        try {
          // initialize and add some likes to the likes count👍
          await likeRocket(rocketId);
        } catch (error) {
          // Handle any errors
          throw new Error(error.message);
        }

        // call the endpoint get the likes👍👍
        try {
          const data = await getLikes();
          /* eslint-disable camelcase */
          const updateLike = data.find(({ item_id }) => item_id === rocketId);
          // update the like count of each rocket in the UI
          if (updateLike) {
            const likeCountElement = document.getElementById(`likeCount${rocketId}`);
            likeCountElement.textContent = `${updateLike.likes} likes`;
          } else {
            const likeCountElement = document.getElementById(`likeCount${rocketId}`);
            likeCountElement.textContent = '0 likes';
          }
        } catch (error) {
          throw new Error(error.message);
        }
      });
    });

    // track the comment💬 button clicked
    const commentButtons = document.querySelectorAll('.comments-button');
    commentButtons.forEach((button) => {
      button.addEventListener('click', () => {
        // const rocketId = button.getAttribute('data-rocket-id');
        // comments to be handled
      });
    });
    
  } catch (error) {
    throw new Error(error.message);
  }
};

export default homepageView;
