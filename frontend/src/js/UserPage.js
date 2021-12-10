let userLevel = "";
window.onload = async () => {
    if (!getSession() || getSession() === "") {
        window.alert('Usuário deslogado');
        window.location = "/"
    }

    let userLabel = document.querySelector("#username-display");
    let username = window.localStorage.getItem('username');
    userLabel.textContent = username;

    userLevel = getUserACL();
    let posts = await showPosts();
    renderPosts(posts);
}
// Seções do painel
const colorSection = document.querySelector('#color-section');
const postSection = document.querySelector('#post');
const lasposSection = document.querySelector('#last-posts');
const userSection = document.querySelector('#user-section');

// Botões do painel
const colorBtn = document.querySelector('#colorBtn');
const postBtn = document.querySelector('#postBtn');
const logoutBtn = document.querySelector('#logoutBtn');

// botoes de formulario
const createUserBtn = document.querySelector('#createUserBtn');
const showUserBtn = document.querySelector('#showUserBtn');
const postZoneBtnForm = document.querySelector('#postZoneBtn');
const submitButtonColor = document.querySelector("#submit-name-color");
const inputNameColor = document.querySelector("#input-name-color");
const inputNameError = document.querySelector("#input-name-error");
const resultsPallete = document.querySelector("#results");
let resPallete = [];

//formularios
const createUserForm = document.querySelector('#createUserForm');
const postForm = document.querySelector('#post-form');

colorBtn.addEventListener('click', (event) => {
    event.preventDefault();
    let atts = colorSection.getAttribute('style');
    if (atts.includes('none')) {
        colorSection.removeAttribute('style');
        colorSection.setAttribute('style', 'display:inherit');
    } else {
        colorSection.removeAttribute('style');
        colorSection.setAttribute('style', 'display:none');
    }
});

postBtn.addEventListener('click', (event) => {
    if(!userLevel.includes('admin')) {
        window.alert("Precisa ser um usuário administrador.")
        return;
    }
    event.preventDefault();
    let atts = postSection.getAttribute('style');
    if (atts.includes('none')) {
        postSection.removeAttribute('style');
        postSection.setAttribute('style', 'display:inherit');
    } else {
        postSection.removeAttribute('style');
        postSection.setAttribute('style', 'display:none');
    }
});

showUserBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    let atts = userSection.getAttribute('style');
    if (atts.includes('none')) {
        userSection.removeAttribute('style');
        userSection.setAttribute('style', 'display:inherit');
        let users = await listUsers();
        let list = document.querySelector('#list-users');
        users.map(u => {
            list.innerHTML = `${list.getInnerHTML()}
                <div>
                    <h4>${u.username}</h4>
                    <p>${u.acl}</p>
                </div>
            `;
        });

    } else {
        userSection.removeAttribute('style');
        userSection.setAttribute('style', 'display:none');
    }
});


logoutBtn.addEventListener('click', async (event) => {
    event.preventDefault();
		let sessionID = getSession();
    document.cookie = 'session=; Max-Age=-99999999;';
    document.cookie = 'username=; Max-Age=-99999999;';
    document.cookie = 'user_acl=; Max-Age=-99999999;';
		await logoutUser(sessionID);
    window.location.reload();
});

function getUserACL() {
    return document.cookie.split(';').filter(c => c.includes('user_acl'))[0].split('=')[1];
}

createUserBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    let inputs = createUserForm.elements;
    let email = inputs[0].value;
    let pass = inputs[1].value;
    let acl = inputs[2].checked ? "admin" : "";
    if(!userLevel.includes("admin")) {
        window.alert("Funcionalidade disponível somente para usuário administrador.");
        return;
    }
    if (email !== "" && pass !== "") {
        const data = {
            username: email, password: pass, acl
        };
        const res = await createUser(data);
        if (res.status === 200) {
            window.alert('Usuário criado com sucesso.');
            window.location.reload();
            return;
        } else if (res.status === 409) {
            window.alert('Um usuário já existe com esse email.');
            return;
        }
        else {
            window.alert('Erro ao criar o usuário.');
            window.location.reload();
            return;
        }
    } else {
        window.alert("Insira um email ou senha para criar o usuário.")
    }
});

postZoneBtnForm.addEventListener('click', async(event) => {
    event.preventDefault();
    let inputs = postForm.elements;
    let title = inputs[0].value;
    let text = inputs[1].value;
		let image = inputs[2].files[0];
		let imageUrl = image.name;
    const data = { title, text, imageUrl };
    if(!userLevel.includes("admin")) {
        window.alert("Somente administradores podem postar.");
        return;
    }
    if(title !== "" && text !== "" && image !== "" && imageUrl !== "") {
        const res = await createPost(data);
				const res2 = await uploadImage(image);
        if(res.acknowledged || res2.acknowledged) {
            window.alert("Post criado com sucesso.");
            window.location.reload();
            return;
        }
    } else {
        window.alert("Você precisa informar um título e o conteúdo.");
        window.location.reload();
        return;
    }
});

submitButtonColor.addEventListener('click', (event) => {
	event.preventDefault();
	if (inputNameColor.value.length > 3) {
			let rangeValues = calculateRangeValues(transformNameInAsciiCode(inputNameColor.value));

			requestColoursPallete(rangeValues).then(pallete => {
					template(pallete);
			});
	} else {
			inputNameError.innerText = "Informe mais de três caracteres"
	}
});

inputNameColor.addEventListener('change', (event) => {
	event.preventDefault();
	if (inputNameColor.value.length > 3) {
			inputNameError.innerText = "";
	}
});