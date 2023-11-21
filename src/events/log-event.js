/* eslint-disable no-undef */
/**
 * Stores user sign-up data in local storage.
 * @returns {Object} - The user data object with username, password, apiKey, favoritesId, and uploadId.
 */
export function signFunc() {
  const data = {
    username: document.querySelector('#signup-username').value,
    password: document.querySelector('#signup-password').value,
    apiKey: document.querySelector('#signup-apikey').value,
    favoritesId: '',
    uploadId: '',
  };

  localStorage.setItem(data.username, JSON.stringify(data));

  return data;
}
/**
 * Validates user login and sets the logged-in username.
 * @returns {string|false} - The logged-in username or false if login is unsuccessful.
 */
export function logInFunc() {
  const username = document.querySelector('#login-username').value;
  const password = document.querySelector('#login-password').value;

  if (localStorage.getItem(username)) {
    const userData = JSON.parse(localStorage.getItem(username));

    if (userData.password === password) {
      localStorage.setItem('loggedInUsername', username);
      return userData.username;
    }
  }
  return false;
}
