export const toSingleGifView = (data) => `
<div id="gifs">
  <h1>${data.title}</h1>
  <div class="content">
    ${toMovieDetailed(data)}
  </div>
</div>
`;

const toMovieDetailed = (data) => `
<div class="gifs-detailed">
  <div class="poster">
    <img src="${data.images.original.url}">
  </div>
  <div class="info">
    <p> Uploaded by: ${data.username} </p>
    <p> Uploaded on: ${data.import_datetime} </p>
    <p> In trending since: ${data.trending_datetime} </p>
    </div>
    </div>
    `;
    
