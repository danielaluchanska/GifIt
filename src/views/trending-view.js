import { renderFavoriteStatus } from '../events/favorites-events.js';
export const trendingGifs = (data) => `
<h1>Trending gifs of Today:</h1>
<div class="view">
  ${data.map(toGifSimple).join('\n')}
</div>
`;

export const toGifSimple = (data) => `
<div class="content-simple">
<img src="${data.images.original.url}"style="border: 2px solid #000;">
<button class="view-category-btn" data-category-id="${
  data.id
}">View details</button>
${renderFavoriteStatus(data.id)}
</div>
`;
