export function GetToken() {
    let token = localStorage.getItem('token')

    if (token) {
        console.log("token is", token)
        return token;
    }
}

export function SetToken(token) {
    localStorage.setItem('token', token);
}