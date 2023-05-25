const baseUrl = 'https://api.spacexdata.com/v3/rockets';
const likeBaseUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/5GbgWWZPMVcYokoIs4ID/likes';
const commentBaseUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps';

const appId = '5GbgWWZPMVcYokoIs4ID';

// get all rockets 🚀🚀
const getAllRockets = async () => {
  try {
    const response = await fetch(`${baseUrl}`);
    if (!response.ok) {
      throw new Error('Could not fetch data');
    }
    const responseData = await response.json();

    // the responese data is an array so loop through and extract the relevant data needed
    const rocketsData = responseData.map(({
      /* eslint-disable camelcase */
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
  } catch (error) {
    throw new Error(error.message);
  }
};

// like👍 a rocket
const likeRocket = async (rocketId) => {
  try {
    const response = await fetch(`${likeBaseUrl}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      /* eslint-disable camelcase */
      body: JSON.stringify({ item_id: rocketId }), // send data to the endpoint
    });
    if (!response.ok) {
      throw new Error('Request failed');
    }
    const responeseData = await response.text();
    return responeseData;
  } catch (error) {
    throw new Error(error.message);
  }
};

// create a comment 💬💬
const makeComment = async (rocketId, username, comment) => {
  try {
    const response = await fetch(`${commentBaseUrl}/${appId}/comments`, {
      // send data to the endpoint
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      /* eslint-disable camelcase */
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
    throw new Error(error.message);
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
    return responseData;
  } catch (error) {
    throw new Error(error.message);
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
    throw new Error(error.message);
  }
};

export {
  getAllRockets, likeRocket, getLikes, makeComment, getComments,
};