import { UPLOAD, CONTAINER_SELECTOR, FAVORITES, HOME, TRENDING, } from '../common/constants.js';
import { setActiveNav, q} from './helpers.js';
import { isLogged } from '../views/home-view.js';
import {loadGifDetails,loadTrendingGif} from '../requests/request-service.js';
import { trendingGifs } from '../views/trending-view.js';
import { toSingleGifView } from '../views/gif-view.js';
import { toUploadGifsView } from '../views/upload-view.js';
import { loadGifDetailsByComma } from '../requests/request-service.js';
import { toFavoritesView } from '../views/favourites-view.js';
import { loadGifDetailsByComma2 } from '../requests/request-service.js';
// public API
/**
 * Loads and displays a specific page within the app.
 * @param {string} page - The page to load (e.g., HOME, TRENDING, FAVORITES, UPLOAD).
 * @returns {void|null} - Displays the selected page, or returns null for an unsupported page.
 */
export const loadPage = (page = '') => {
  switch (page) {
    case HOME:
      setActiveNav(HOME);
      return renderHome();

    case TRENDING:
      setActiveNav(TRENDING);
      return renderTrending();

    case FAVORITES:
      setActiveNav(FAVORITES);
      return renderFavorites();

    case UPLOAD:
      setActiveNav(UPLOAD);
      return renderUpload();

    /* if the app supports error login, use default to log mapping errors */
    default:
      return null;
  }
};
/**
 * Renders the trending GIFs page.
 */
export const renderTrending = () => {
  loadTrendingGif()
    .then((data) => (q(CONTAINER_SELECTOR).innerHTML = trendingGifs(data.data)))
    .catch((err) => {
      console.error(err);
    });
};
/**
 * Renders a detailed view of a GIF.
 * @param {string} searchTerm - The search term or GIF ID to display.
 */
export const renderDetailGif = (searchTerm) => {
  loadGifDetails(searchTerm)
    .then(
      (data) => (q(CONTAINER_SELECTOR).innerHTML = toSingleGifView(data.data))
    )
    .catch((err) => {
      console.error(err);
    });
};
/**
 * Renders the upload page (private function).
 */
// private functions
const renderUpload = () => {
  loadGifDetailsByComma()
    .then(
      (data) => (q(CONTAINER_SELECTOR).innerHTML = toUploadGifsView(data.data))
    )
    .catch((err) => {
      console.error(err);
    });
};
/**
 * Renders the home page (private function).
 */
const renderHome = () => {
  q(CONTAINER_SELECTOR).innerHTML = isLogged();
};
/**
 * Renders the favorites page (private function).
 */
const renderFavorites = () => {
  loadGifDetailsByComma2()
    .then(
      (data) => (q(CONTAINER_SELECTOR).innerHTML = toFavoritesView(data.data))
    )
    .catch((err) => {
      console.error(err);
    });
};
