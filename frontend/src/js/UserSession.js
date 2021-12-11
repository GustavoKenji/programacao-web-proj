async function createUser(data) {
    return await fetch(`${API_URL}/user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
}

function listUsers() {
    return fetch(`${API_URL}/user`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    }).then(res => {
        if(res.status===200) {
            return res.json();
        }
    });
}