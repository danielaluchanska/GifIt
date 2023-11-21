/* eslint-disable no-undef */
import {BYID_URL, SEARCH_URL, TRENDING_URL, UPLOAD_URL2, UPLOAD, SAVED_USER_NAME, SEARCH_URL_FLAG, GIF_SEPARATED_BY_COMMA_URL, RANDOM_GIF_URL, RANDOM_GIF_URL_FLAG, IDS,  MID_KEY} from '../common/constants.js';
import { getFavorites } from '../data/favorites.js';
import { loadPage } from '../events/navigation-events.js';

/**
 * Loads trending GIFs from a specified URL.
 * @returns {Promise} A promise that resolves to the JSON response of trending GIFs.
 */
export const loadTrendingGif = () => {
  const userData = getUserData();
  if(!userData) {
    return alert('You need to log in first to use this feature');
  }else {
  setGreeting();
  return fetch(`${TRENDING_URL}${userData.apiKey}`)
    .then((res) => res.json())
    .catch((err) => {
      console.error(err);
    });
  }
};
/**
 * Loads GIFs based on a search term.
 * @param {string} searchTerm - The search term for GIFs.
 * @returns {Promise} A promise that resolves to the JSON response of the search results.
 */
export const loadSearchGif = (searchTerm = '') => {
  const userData = getUserData();
  if(!userData) {
    return alert('You need to log in first to use this feature');
  }else {
  setGreeting();
  return fetch(`${SEARCH_URL}${userData.apiKey}&q=${searchTerm}${SEARCH_URL_FLAG}`)
    .then((res) => res.json())
    .catch((err) => {
      console.error(err);
    });
  }
};
/**
 * Loads details of a GIF by its ID.
 * @param {string} id - The ID of the GIF to load details for.
 * @returns {Promise} A promise that resolves to the JSON response containing GIF details.
 */
export const loadGifDetails = async (id = '') => {
  const userData = getUserData();
  setGreeting();
  return fetch(`${BYID_URL}${id}${MID_KEY}${userData.apiKey}`)
  .then((res) => res.json())
  .catch((err) => {
    console.error(err);
  });
};
/**
 * Loads GIF details for multiple IDs separated by commas.
 * @param {string} ids - Comma-separated IDs of GIFs to load details for.
 * @returns {Promise} A promise that resolves to the JSON response containing GIF details.
 */
export const loadGifDetailsByComma = () => {
  const userData = getUserData();
  if(!userData) {
    return alert('You need to log in first to use this feature');
  } else {
    const getIds = userData.uploadId;
    setGreeting();
    return fetch(`${GIF_SEPARATED_BY_COMMA_URL}${userData.apiKey}${IDS}${getIds}`)
    .then((res) => res.json())
    .catch((err) => {
      console.error(err);
    });
  }
};

/**
 * Uploads a GIF file, updates user data, and navigates to the upload page if logged in.
 * @function
 * @returns {void}
 */
export const loadUploadGIF = () => {
  const fileInput = document.getElementById('fileInput');
  const userData = getUserData();
  if (!userData) {
    return alert('You need to log in first to use this feature');
  } else {
    setGreeting();
    const formData = new FormData();
    formData.append('file', fileInput.files[0]);
    fetch(`${UPLOAD_URL2}${userData.apiKey}`, {
      method: 'POST',
      body: formData,
    })
    .then((res) => res.json())
    .then((data) => {
      const gifId = data.data.id;
      userData.uploadId += gifId + ',';
      localStorage.setItem(userData.username, JSON.stringify(userData));
    })
    .then((res) => {
      loadPage(UPLOAD);
    })
    .catch((err) => console.error(err));
  }
};

/**
 * Loads GIF details for multiple IDs separated by commas or a random GIF if the favorites list is empty.
 * @returns {Promise} A promise that resolves to the JSON response containing GIF details.
 */
export const loadGifDetailsByComma2 = () => {
  const getName = SAVED_USER_NAME;
  if(getName=== '') {
    return alert('You need to log in first to use this feature');
  }
  const isEmptyArray = getFavorites();
  const userData = getUserData();
  const getIds = userData.favoritesId;
  setGreeting();
  if (isEmptyArray.length < 1) {
    return fetch(`${RANDOM_GIF_URL}${userData.apiKey}${RANDOM_GIF_URL_FLAG}`)
    .then((res) => res.json())
    .catch((err) => {
      console.error(err);
    });
  } else {
    return fetch(`${GIF_SEPARATED_BY_COMMA_URL}${userData.apiKey}${IDS}${getIds}`)
    .then((res) => res.json())
    .catch((err) => {
      console.error(err);
    });
  }
};
/**
 * Sets a greeting message for the logged-in user.
 * @function
 * @returns {void}
 */
export const setGreeting = () => {
  const username = getUserData().username;
  greeting.textContent = `Hello, ${username}`;
  greeting.style.display = 'inline';
};
/**
 * Retrieves user data from local storage.
 * @function
 * @returns {Object|null} The user data, or null if not found.
 */
export const getUserData = () => {
  const username = SAVED_USER_NAME;
  const userData = JSON.parse(localStorage.getItem(username));
  return userData;
};
