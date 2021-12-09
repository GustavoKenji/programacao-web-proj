/* APIs */
const colourAPI = "http://colourlovers.com/api/palettes/new?format=json";
const loginAPI = "https://reqres.in/api/login";

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

const colorPage = document.getElementById("color-page");
const logoutButton = document.getElementById("logout-button");
const inputWordColor = document.querySelector("#input-word");
const inputWordError = document.querySelector("#input-word-error");
const submitButtonColor = document.querySelector("#submit-word");
const resultsPalette = document.querySelector("#results");
let responsePalette = [];

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

loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    let emailInput = loginEmail.value;
    let passwordInput = loginPassword.value;

    if (emailInput.length <= 3 || passwordInput.length <= 3) {
        loginPassword.classList.add("invalid-input");
        loginEmail.classList.add("invalid-input");
        alert.innerText = alertMessage;

        return;
    }

    requestLogin(emailInput, passwordInput);
});

function requestLogin(email, password) {
    try {
        let token = "";
        let requestBody = {
            email: email.trim(),
            password: password.trim()
        };

        fetch(loginAPI, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody)
        }).then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                displayRequestError(response.statusText);
            }
        }).then(data => {
            document.cookie = `access_token=${data.token}`;
            displayColorDisplay();
            closeLoginPanel();
        }).catch(err => {
            console.error(err);
        });
    } catch (error) {
        console.error('erro', error);
    }
}

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

function recoverToken() {
    let cookies = document.cookie.split(';');
    let token = cookies.filter((t) => t.includes("access_token"));
    return token[0].split("=")[1];
}

function displayColorDisplay() {
    let acces_token = recoverToken()
    if (acces_token !== "") {
        colorPage.setAttribute("style", "display:inherit");
        
    } else {
        colorPage.setAttribute("style", "display:none");
    }
}

logoutButton.addEventListener('click', () => {
    colorPage.setAttribute("style", "display:none");
});

inputWordColor.addEventListener('change', (event) => {
    event.preventDefault();
    if (inputWordColor.value.length > 3) {
        inputWordError.innerText = "";
    }
});

submitButtonColor.addEventListener('click', (event) => {
    event.preventDefault();
    if (inputWordColor.value.length > 3) {
        let rangeValues = calculateRangeValues(transformNameInAsciiCode(inputWordColor.value));

        requestColoursPallete(rangeValues).then(pallete => {
            template(pallete);
        });
    } else {
        inputWordError.innerText = "Informe mais de três caracteres"
    }
});

function transformNameInAsciiCode(nameArray) {
    let nameSplited = nameArray.split("");
    return nameSplited.map(ch => {
        return ch.charCodeAt();
    });
}

function calculateRangeValues(listCodes) {
    let { first, second } = separeteList(listCodes);
    let minVal = first.reduce((accumulator, current) => accumulator + current);
    let maxVal = second.reduce((accumulator, current) => accumulator + current);

    minVal = ((359 * (maxVal - minVal) / (359 + minVal)));
    maxVal = ((359 * (maxVal - minVal) / (359 + maxVal)));

    return { min: Math.ceil(minVal), max: Math.ceil(maxVal) };
}

function separeteList(listCodes) {
    listCodes = listCodes.sort((a, b) => a - b);
    let middle = Math.floor(listCodes.length / 2);
    let firstSubList = listCodes.slice(0, middle);
    let secondSubList = listCodes.slice(middle, listCodes.length);

    return { first: firstSubList, second: secondSubList };
}

function requestColoursPallete(values) {
    let { min, max } = values;
    let url = `${colourAPI}&hueRange=${min},${max}&jsonCallback=_callback`;
    return $.ajax({
        url: url,
        crossDomain: true,
        dataType: "jsonp",
        jsonpCallback: '_callback',
        complete: function (xhr, status) {
            console.log('complete')
        },
        success: function (data, status, xhr) {
            if (data.length != undefined && data.length > 0) {
                if (data[0].colors != undefined) {
                    responsePalette = data;
                }
            }
        },
        error: function (xhr, status, error) {
            alert('There was a problem getting a color palette.');
        }
    });
}

function template(values) {
    let randomNumber = getRandomArbitrary();
    let palettes = values.slice(randomNumber, randomNumber + 1);
    let palette = palettes.map((val) => {
        return `
            <span class="palette-title">${val.title}</span>     
            <div class="palette-result">
                ${val.colors.map(v => {
                    return `<div class="palette-square" style="background:#${v};">
                    </div>`
                }).join("")}
            </div>
        `;
    });

    resultsPalette.innerHTML = palette.join("");
}

function getRandomArbitrary() {
    return Math.random() * (20 - 0) + 0;
  }