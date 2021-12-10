function saveSession(data) {
    const { sessionID, user } = data;
    document.cookie = `session=${sessionID};`;
    document.cookie = `user_acl=${user.acl}`;
    document.cookie = `username=${user.username}`;
}

function getSession() {
    let cookies = document.cookie.split(';');
    let exists = cookies.filter(c => c.includes('session'));
    if (exists.length !== 0) {
        let val = exists[0].split("=")[1];
        return val !== "" ? val : null;
    }
    return null;
}
