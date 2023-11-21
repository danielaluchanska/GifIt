import { toGifSimple } from './trending-view.js';
export const toUploadGifsView = (data) => `
<h1> Upload your gif here: </h1>
<form id="form">
<div id="message">
<p id="error-message"></p>
</div>
    <input type="file" id="fileInput" accept=".gif">
    
    <button type="submit" id="upl-button">Upload File</button>
  </form>
  <h1>Uploaded Giffs:</h1>
  <div class="view">
    ${data.map(toGifSimple).join('\n')};
  </div>
`;
