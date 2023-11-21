/* eslint-disable no-undef */
import { getFavorites, addFavorite, removeFavorite } from '../data/favorites.js';
import { EMPTY_HEART, FULL_HEART, SAVED_USER_NAME} from '../common/constants.js';
/**
 * Toggles the favorite status of a GIF by adding or removing it from the user's favorites.
 *
 * @param {string} gifId - The ID of the GIF to toggle the favorite status for.
 */
export const toggleFavoriteStatus = (movieId) => {
  const username = SAVED_USER_NAME;
  const userData = JSON.parse(localStorage.getItem(username));

  if (userData) {
    const favorites = userData.favoritesId;
    const heartSpan = document.querySelector(
      `span[data-movie-id="${movieId}"]`
    );

    if (favorites.includes(movieId)) {
      removeFavorite(movieId);
      heartSpan.classList.remove('active');
      heartSpan.innerHTML = EMPTY_HEART;
    } else {
      addFavorite(movieId);
      heartSpan.classList.add('active');
      heartSpan.innerHTML = FULL_HEART;
    }
  } else {
    alert('Please log in to manage favorites.');
  }
};

/**
 * Renders the favorite status for a GIF, displaying a heart icon.
 *
 * @param {string} gifId - The ID of the GIF to render the favorite status for.
 * @returns {string} HTML content representing the favorite status.
 */
export const renderFavoriteStatus = (movieId) => {
  const favorites = getFavorites().split(',');

  return favorites.includes(movieId)
    ? `<span class="favorite active" data-movie-id="${movieId}">${FULL_HEART}</span>`
    : `<span class="favorite" data-movie-id="${movieId}">${EMPTY_HEART}</span>`;
};
/**
 * Renders the favorite status for a GIF in a favorites view, displaying a different style heart icon.
 *
 * @param {string} movieId - The ID of the GIF to render the favorite status for.
 * @returns {string} HTML content representing the UPDATED favorite status in favorites view.
 */
export const renderFavoriteStatusForFavoritesView = (movieId) => {
  const favorites = getFavorites().split(',');

  return favorites.includes(movieId)
    ? `<span class="favorite2 active" data-movie-id="${movieId}">${FULL_HEART}</span>`
    : `<span class="favorite2" data-movie-id="${movieId}">${EMPTY_HEART}</span>`;
};
