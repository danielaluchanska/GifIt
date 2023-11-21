/* eslint-disable no-undef */
import { FAVORITES, HOME, TRENDING } from "./common/constants.js";
import { toggleFavoriteStatus } from "./events/favorites-events.js";
import { q } from "./events/helpers.js";
import { loadPage, renderDetailGif } from "./events/navigation-events.js";
import { renderSearchItems } from "./events/search-events.js";
import { loadUploadGIF } from "./requests/request-service.js";
import { logInFunc, signFunc } from "./events/log-event.js";
import { isLogged, toLogInView } from "./views/home-view.js";
import { setGreeting } from "./requests/request-service.js";
document.addEventListener("DOMContentLoaded", () => {
  // add global listener
  document.addEventListener("click", (event) => {
    // nav events
    if (event.target.classList.contains("nav-link")) {
      loadPage(event.target.getAttribute("data-page"));
    }

    // show trending events
    if (event.target.classList.contains("view-category-btn")) {
      renderDetailGif(event.target.getAttribute("data-category-id"));
    }

    // toggle favorite event
    if (event.target.classList.contains("favorite")) {
      toggleFavoriteStatus(event.target.getAttribute("data-movie-id"));
      // loadPage(FAVORITES);
    }
    if (event.target.classList.contains("favorite2")) {
      toggleFavoriteStatus(event.target.getAttribute("data-movie-id"));
      loadPage(FAVORITES);
    }
  });
  // logout event
  document.addEventListener("click", (event) => {
    if(event.target.id=== "logout") {
      localStorage.setItem("loggedInUsername", "");
      greeting.style.display = "none";
      location.reload(true);
      loadPage(HOME);
      isLogged();
    }
  });

  // upload event
  document.addEventListener("submit", (event) => {
    if (event.target.id === "form") {
      const messageDiv = document.getElementById("error-message");
      const fileInput = document.getElementById("fileInput");
      event.preventDefault();
      const file = fileInput.files[0];
      if (file.type !== "image/gif") {
        messageDiv.textContent = "Please select a GIF file.";
        messageDiv.style.color = "red";
        return;
      } else {
        loadUploadGIF();
        messageDiv.textContent = "Good choice";
        messageDiv.style.color = "green";
        return;
      }
    }
  });
  // Search input event
  q("input#search").addEventListener("input", (e) => {
    const inputValue = e.target.value;
    if (inputValue === "") {
      loadPage(TRENDING);
    } else {
      renderSearchItems(e.target.value);
    }
  });
  // Load the HOME page by default
  loadPage(HOME);
});
/**
 * Handles login, signup, and logout actions.
 */
document.addEventListener("DOMContentLoaded", () => {
  const loginButton = document.querySelector("#login-button");
  const signupButton = document.querySelector("#signup-button");
  // Login button click event
  loginButton.addEventListener("click", () => {
    const loginSuccess = logInFunc();
    if (loginSuccess) {
      location.reload(true);
      loadPage(HOME);
      console.log(localStorage.loginSuccess);
    } else {
      alert("Login failed. Check your username and password.");
    }
  });
  // Signup button click event
  signupButton.addEventListener("click", () => {
    const userData = signFunc();
    if (userData) {
      alert("Sign-up successful. You can now log in.");
      location.reload(true);
      console.log(localStorage);
    }
  });
});
