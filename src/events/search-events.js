import { CONTAINER_SELECTOR } from '../common/constants.js';
import { loadSearchGif } from '../requests/request-service.js';
import { toSearchView } from '../views/search-view.js';
import { q } from './helpers.js';

/**
 * Renders a list of search results for a given search term.
 *
 * @param {string} searchTerm - The search term used to retrieve and display search results.
 */

export const renderSearchItems = (searchTerm) => {
  loadSearchGif(searchTerm)
  .then(data =>q(CONTAINER_SELECTOR).innerHTML = toSearchView(data.data, searchTerm))
  .catch(err => {
    console.error(err);
  });
};

