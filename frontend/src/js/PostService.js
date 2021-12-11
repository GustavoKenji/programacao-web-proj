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
								<image src="${API_URL}/public/Uploads/${p.imageUrl}" />
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

function uploadImage(req) {
	const formData = new FormData();
	formData.append("upload-image", req);
	return fetch(`${API_URL}/upload-image`, {
			method: "POST",
			enctype: 'multipart/form-data',
			body: formData
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