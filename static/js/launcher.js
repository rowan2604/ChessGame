document.getElementById('playB').addEventListener("click", function () {
    if (username.length == 0) {
        username.push("Guest");
    }
    client.send('username', username[0]);
})
