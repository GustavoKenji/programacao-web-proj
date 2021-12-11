const loginButton = document.getElementById("loginBtn");
const closeLoginPanelButton = document.getElementById("close-login-panel");
const loginPanel = document.getElementById("login-panel");
const loginForm = document.getElementById("login-form");
const loginEmail = document.getElementById("email");
const loginPassword = document.getElementById("password");
const alert = document.getElementById("display-alert");
const alertMessage = "Email ou senha inválidos";

const failedLogin = document.getElementById("failed-login");
const failedLoginMessage = document.getElementById("failed-login-message");
const closeFailedLoginMessage = document.getElementById("close-failed-login-message");

window.onload = () => {
    if (getSession() && getSession() !== "") {
        window.location = "user.html";
    }
}

loginButton.addEventListener('click', () => {
    loginPanel.setAttribute("style", "display:inherit");
});

closeLoginPanelButton.addEventListener('click', () => {
    loginPanel.setAttribute("style", "display:none");
});

loginEmail.addEventListener('change', (event) => {
    event.preventDefault();
    if (loginEmail.classList.toString().includes("invalid-input")) {
        loginEmail.classList.remove("invalid-input");
        alert.innerText = "";
    }
});

loginPassword.addEventListener('change', (event) => {
    event.preventDefault();
    if (loginPassword.classList.toString().includes("invalid-input")) {
        loginPassword.classList.remove("invalid-input");
        alert.innerText = "";
    }
});

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    let emailInput = loginEmail.value;
    let passwordInput = loginPassword.value;

    if (emailInput.length <= 3 || passwordInput.length <= 3) {
        loginPassword.classList.add("invalid-input");
        loginEmail.classList.add("invalid-input");
        alert.innerText = alertMessage;

        return;
    }

    const login = await requestLogin(emailInput, passwordInput);
    if (!login.error) {
        saveSession(login);
        saveUserNameLocalstorage(login);
        closeLoginPanel();
        changePage();
        return;
    }
    displayRequestError(login.error);
    return;

});

function displayRequestError(errorMessage) {
    failedLoginMessage.innerText = errorMessage
    failedLogin.setAttribute("style", "display:inherit");
}

closeFailedLoginMessage.addEventListener('click', () => {
    failedLogin.setAttribute("style", "display:none");
});

function closeLoginPanel() {
    loginEmail.value = "";
    loginPassword.value = "";
    loginPanel.setAttribute("style", "display:none");
}

function saveUserNameLocalstorage(data) {
    const{user} = data;
    window.localStorage.setItem('username', user.username);
}

function changePage() {
    let sessionTk = getSession();
    if (sessionTk || sessionTk !== "") {
        window.location = "user.html"
        return;
    }
    return;

}