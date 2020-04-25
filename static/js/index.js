let client = new Client();
if (sessionStorage.username != undefined) {
    let usernameJSON = sessionStorage.getItem("username");
    username = JSON.parse(usernameJSON)
    console.log(username);
}