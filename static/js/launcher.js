document.getElementById('playB').addEventListener("click", function () {
    client.send('username', username[0]);
})

document.getElementById("signIN").addEventListener("click", function () {
    let username = document.getElementById("input_username").value;
    let password = document.getElementById("input_password").value;
    let body = {
        username: username,
        password: password
    };
    const Http = new XMLHttpRequest();
    Http.open('post', '/signin');
    Http.setRequestHeader("Content-Type", "application/json");
    Http.send(JSON.stringify(body));
    Http.onload = function () {
        if (Http.status == 200) {
            alert('Welcome  '+ body.username)
            users=body.username;
            name.push(users);
        } else {
            alert('username or password incorrect')
        }
    };
})


document.getElementById("signUP").addEventListener("click", function (e) {
    // console.log(" ca marche ");
    let username = document.getElementById("input_username").value;
    let password = document.getElementById("input_password").value;
    let body = {
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
            let response = JSON.parse(Http.response);
            if (response.error == 'username_already_used') {
                alert('le username est deja utilisé')
            } else {
                alert('une erreur est survenue , veuillez changer vos coordonnés.')
            }
        }
    }
})