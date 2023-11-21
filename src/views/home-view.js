/* eslint-disable no-undef */
import { SAVED_USER_NAME } from '../common/constants.js';

export const toHomeView = () => `
<div id="home">
<h1>Giphy App</h1>
<div class="content">
<p>Simple GIFs database app. You can:</p>
<ul>
    <li>Browse GIFs</li>
    <li>Add and remove GIFs from favorites</li>
    <li>Upload your favorite GIFs</li>
    <li>Search for GIFs by title</li>
    <div>
    <button id="logout">Log out</button>
    </div>
  </ul>
`;
export const toLogInView = () => `
<div id="loginview">
  <h2>Login or Sign Up</h2>
  <div id="login-form" class="form">
    <label for="login-username">Username</label>
    <input type="text" id="login-username" autocomplete="off" placeholder="Enter your username">
    <label for="login-password">Password</label>
    <input type="password" id="login-password" placeholder="Enter your password">
    <button id="login-button">Log In</button>
  </div>
  <div id="signupform" class="form">
    <label for="signup-username">Username</label>
    <input type="text" id="signup-username" autocomplete="off" placeholder="Create a username">
    <label for="signup-password">Password</label>
    <input type="password" id="signup-password" placeholder="Create a password">
    <label for="signup-apikey">API Key</label>
    <input type="password" id="signup-apikey" placeholder="Enter an API key">
    <button id="signup-button">Sign Up</button>
  </div>
</div>
`;
console.log(localStorage);

export const isLogged = () => {
  const getData = SAVED_USER_NAME;
  if(getData !== '') {
    return toHomeView();
  }else {
    return toLogInView();
  }
};
