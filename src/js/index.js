const colourAPI = "http://colourlovers.com/api/palettes/new?format=json";
const loginAPI = "https://reqres.in/api/login";

const loginButton = document.getElementById("loginBtn");
const closeLoginPanelButton = document.getElementById("close-login-panel");
const loginPanel = document.getElementById("login-panel");

loginButton.addEventListener('click', () => {
    loginPanel.setAttribute("style", "display:inherit");
});

closeLoginPanelButton.addEventListener('click', () => {
    loginPanel.setAttribute("style", "display:none");
});

