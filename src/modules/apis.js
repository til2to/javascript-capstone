const baseUrl = 'https://api.spacexdata.com/v3/rockets';
const likeBaseUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/5GbgWWZPMVcYokoIs4ID/likes';
const commentBaseUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps';

const appId = '5GbgWWZPMVcYokoIs4ID';

// get all rockets 🚀🚀
const getAllRockets = async () => {
  try {
    const response = await fetch(`${baseUrl}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) {
      throw new Error('Could not fetch data');
    }
    const responseData = await response.json();

    // the responese data is an array so loop through and extract the relevant data needed
    const rocketsData = responseData.map(({

      rocket_name, rocket_id, flickr_images, cost_per_launch,
      success_rate_pct, mass, rocket_type,
    }) => ({
      rocket_type,
      mass,
      success_rate_pct,
      cost_per_launch,
      rocket_name,
      rocket_id,
      flickr_images: flickr_images[0], // Extract the first element from the flickr_images array
    }));

    localStorage.setItem('rocketData', JSON.stringify(rocketsData));
    return rocketsData;
  } catch (error) {
    /* eslint-disable no-console */
    console.log(error.message);
    /* eslint-enable no-console */
    return null;
  }
};

// like👍 a rocket
const likeRocket = async (rocketId) => {
  try {
    const response = await fetch(`${likeBaseUrl}`, {
      method: 'POST',

      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ item_id: rocketId }), // send data to the endpoint
    });
    if (!response.ok) {
      throw new Error('Request failed');
    }
    const responeseData = await response.text();
    return responeseData;
  } catch (error) {
    /* eslint-disable no-console */
    console.log(error.message);
    /* eslint-enable no-console */
    return null;
  }
};

// create a comment 💬💬
const makeComment = async (rocketId, username, comment) => {
  try {
    const response = await fetch(`${commentBaseUrl}/${appId}/comments`, {
      // send data to the endpoint
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },

      body: JSON.stringify({
        item_id: rocketId, username, comment,
      }),
    });

    if (!response.ok) {
      throw new Error('Request failed');
    }
    const responeseData = await response.text();
    return responeseData;
  } catch (error) {
    /* eslint-disable no-console */
    console.log(error.message);
    /* eslint-enable no-console */
    return null;
  }
};

// get comments💬💬 by and id
const getComments = async (rocketId) => {
  try {
    const response = await fetch(`${commentBaseUrl}/${appId}/comments?item_id=${rocketId}`);
    // to handle the comment count where there is no comment for the current rocket
    if (!response.ok && response.status === 400) {
      return [];
    }

    const responseData = await response.json();
    const counter = responseData.length;
    localStorage.setItem('commentCounter', JSON.stringify(counter));
    return responseData;
  } catch (error) {
    /* eslint-disable no-console */
    console.log(error.message);
    /* eslint-enable no-console */
    return null;
  }
};

// get all likes👍👍
const getLikes = async () => {
  try {
    const responese = await fetch(`${likeBaseUrl}`);
    if (!responese.ok) {
      throw new Error('Request failed');
    }
    const responseData = await responese.json();
    return responseData;
  } catch (error) {
    /* eslint-disable no-console */
    console.log(error.message);
    /* eslint-enable no-console */
    return null;
  }
};

export {
  getAllRockets, likeRocket, getLikes, makeComment, getComments,
};