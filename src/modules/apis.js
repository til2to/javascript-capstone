const baseUrl = 'https://api.spacexdata.com/v3/rockets';
const likeBaseUrl = "https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/5GbgWWZPMVcYokoIs4ID/likes";

// get all likes👍👍
const getLikes = async () => {
  try {
    const responese = await fetch(`${likeBaseUrl}`);
    if(!responese.ok){
      throw new Error('Request failed');
    }
    const responseData = await responese.json()
    return responseData
  } catch (error) {
    throw new Error(error.message)
  }
}

// like👍 a rocket
const likeRocket = async (rocketId) => {
  try {
    const response = await fetch(`${likeBaseUrl}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ item_id: rocketId }),
    });
    if (!response.ok) {
      throw new Error('Request failed');
    };
    const responeseData = await response.text()
    return responeseData
  } catch (error) {
    throw new Error(error.message);
  }
}

// get all rockets 🚀🚀
const getAllRockets = async () => {
  try {
    const response = await fetch(`${baseUrl}`);
    if (!response.ok) {
      throw new Error('Could not fetch data');
    };
    const responseData = await response.json();
    
    // the responese data is an array so loop through and extract the relevant data needed
    const rocketsData = responseData.map(({ rocket_name, rocket_id, flickr_images }) => ({
      rocket_name,
      rocket_id,
      flickr_images: flickr_images[0] // Extract the first element from the flickr_images array
    }));
    
    localStorage.setItem('rocketData', JSON.stringify(rocketsData));
  } catch (error) {
    throw new Error(error.message);
  }
};

export { getAllRockets, likeRocket, getLikes };