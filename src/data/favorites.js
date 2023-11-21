/* eslint-disable no-undef */
import { SAVED_USER_NAME } from '../common/constants.js';
/**
 * Adds a GIF to the user's list of favorite GIFs.
 *
 * @param {string} gifId - The ID of the GIF to add to favorites.
 */
export const addFavorite = (gifId) => {
  const username = SAVED_USER_NAME;
  const userData = JSON.parse(localStorage.getItem(username));
  if (userData) {
    if (userData.favoritesId.includes(gifId)) {
      return;
    }

    userData.favoritesId += gifId + ',';
    localStorage.setItem(username, JSON.stringify(userData));
  } else {
    alert('Please log in to add favorites.');
  }
};

/**
 * Removes a GIF from the user's list of favorite GIFs.
 *
 * @param {string} gifId - The ID of the GIF to remove from favorites.
 */
export const removeFavorite = (gifId) => {
  const username = SAVED_USER_NAME;
  const userData = JSON.parse(localStorage.getItem(username));

  if (userData) {
    let favoritesIdArr = userData.favoritesId.split(',');
    favoritesIdArr = favoritesIdArr.filter((id) => id !== gifId);
    userData.favoritesId = favoritesIdArr.join(',');
    localStorage.setItem(username, JSON.stringify(userData));
  } else {
    alert('Please log in to remove favorites.');
  }
};
/**
 * Retrieves the list of favorite GIFs for the user.
 *
 * @returns {string} A comma-separated string of GIF IDs representing the user's favorite GIFs.
 */
export const getFavorites = () => {
  const username = SAVED_USER_NAME;
  const userData = JSON.parse(localStorage.getItem(username));
  return userData ? userData.favoritesId : '';
};
