function showPosts() {
    return fetch(`${API_URL}/posts`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    }).then(res => {
        if (res.status === 200) {
            return res.json();
        } else {
            return []
        }
    });
}

function renderPosts(posts) {
    let listPosts = document.querySelector('#posts-list');
    posts.map(p => {
        listPosts.innerHTML = `
            ${listPosts.getInnerHTML()}
            <div>
                <h3>${p.title}</h3>
                <p>${p.text}</p>
                <button 
                    id=${p._id}
                    class="delete-post-btn" onClick="deletePost(this.id)"
                >
                <i class="fa fa-trash-o" aria-hidden="true"></i> Deletar
                </button>
            </div>
        `;
    });
}

function createPost(req) {
    return fetch(`${API_URL}/posts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req)
    }).then(res => {
        if (res.status === 200) {
            return res.json();
        } else {
            return { acknowledged: false }
        }
    })
}

function deletePost(id) {
    return fetch(`${API_URL}/posts?id=${id}`, {
        method: "DELETE",
        headers: {"Content-Type": "application/json"}
    }).then(res => {
        if(res.status===200){
            window.location.reload();
            return res.json();
        } else {
            window.alert('Erro ao deletar o post.')
            window.location.reload();
            return;
        }
    });
}

function searchPost(req) {
    return fetch(`${API_URL}/searchPost`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req)
    })
}

function clearPosts() {
    let listPosts = document.querySelector('#posts-list');
    listPosts.innerHTML = `
        ${listPosts.getInnerHTML()}
        <div>
        </div>
    `;
}