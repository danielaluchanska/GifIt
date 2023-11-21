import { toGifSimple } from './trending-view.js';
export const toSearchView = (data, searchTerm) => `
  <h1>Giffs found for "${searchTerm}":</h1>
  <div class="view">
    ${data.map(toGifSimple).join('\n')}
  </div>
`;
