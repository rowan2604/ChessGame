document.getElementById('playB').addEventListener("click", function () {
    let username = [];
    if(sessionStorage.username != undefined){
        let usernameJSON = sessionStorage.getItem("username");
        username = JSON.parse(usernameJSON)
        console.log(username);
    }
    if (username.length == 0) {
        username.push("Guest");
    }
    client.send('username', username[0]);
})
