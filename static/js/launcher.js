document.getElementById('playB').addEventListener("click", function () {
    client.send('username', username[0]);
})

document.getElementById("signIN").addEventListener("click", function () {
    var username = document.getElementById("input_username").value;
    var password = document.getElementById("input_password").value;
    var body = {
        username: username,
        password: password
    };
    const Http = new XMLHttpRequest();
    Http.open('post', '/signin');
    Http.setRequestHeader("Content-Type", "application/json");
    Http.send(JSON.stringify(body));
    Http.onload = function () {
        if (Http.status == 200) {
            alert('Welcome')
        } else {
            alert('username or password incorrect')
        }
    };
})

document.getElementById("signUP").addEventListener("click", function (e) {
    // console.log(" ca marche ");
    var username = document.getElementById("input_username").value;
    var password = document.getElementById("input_password").value;
    var body = {
        username: username,
        password: password
    };
    const Http = new XMLHttpRequest();
    Http.open('post', '/signup');
    Http.setRequestHeader("Content-Type", "application/json");
    Http.send(JSON.stringify(body));
    Http.onload = function () {
        if (Http.status == 200) {
            alert('Inscription Reussie')
        } else {
            var response = JSON.parse(Http.response);
            if (response.error == 'username_already_used') {
                alert('le username est deja utilisé')
            } else {
                alert('une erreur est survenue')
            }
        }
    }
})