import { getFavorites } from '../data/favorites.js';
import { renderFavoriteStatusForFavoritesView } from '../events/favorites-events.js';
export const toFavoritesView = (data) => `
<div id="movies">
  <h1>Favorite gifs:</h1>
  <div class="view">
    ${checkIsEmpty(data)}
  </div>
</div>
`;

export const toGifSimpleForFavoritesView = (data) => `
<div class="content-simple">
<img src="${data.images.original.url}"style="border: 2px solid #000;">
<button class="view-category-btn" data-category-id="${data.id}">View details</button>
${renderFavoriteStatusForFavoritesView(data.id)}
</div>
`;

/**
 * Checks if the number of favorites is empty and formats the data accordingly.
 *
 * @param {Array} data - An array of data representing favorites.
 * @returns {string} Formatted HTML content for displaying favorites. If there are no favorites, a random GIF is displayed.
 */
const checkIsEmpty = (data) => {
  const count = getFavorites();
  if (count < 1) {
    return toGifSimpleForFavoritesView(data);
  } else {
    return data.map(toGifSimpleForFavoritesView).join('\n');
  }
};