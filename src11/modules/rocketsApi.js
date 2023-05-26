const baseUrl = 'https://api.spacexdata.com/v3/rockets';

// app id: 5GbgWWZPMVcYokoIs4ID

// get all rockets 🚀🚀
const getAllRockets = async () => {
  try {
    const response = await fetch(`${baseUrl}`);
    if (!response.ok) {
      throw new Error('Could not fetch data');
    }
    const responseData = await response.json();

    // the responese data is an array so loop through and extract the relevant data needed
    /* eslint-disable camelcase */
    const rocketsData = responseData.map(({ rocket_name, rocket_id, flickr_images }) => ({
      rocket_name,
      rocket_id,
      flickr_images: flickr_images[0], // Extract the first element from the flickr_images array
    }));

    localStorage.setItem('rocketData', JSON.stringify(rocketsData));
  } catch (error) {
    throw new Error(error.message);
  }
};

export default getAllRockets;