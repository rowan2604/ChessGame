document.getElementById('playB').addEventListener("click", function () {
    client.send('username', username[0]);
    console.log(username[0]);
})

<<<<<<< HEAD
document.getElementById("signIN").addEventListener("click", function () {
=======
document.getElementById("signIN").addEventListener("click", function (e) {
>>>>>>> 753ffaf20921bec9494277ecb88e21084f4cd076
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
<<<<<<< HEAD
            alert('Welcome  '+ body.username)
=======
            alert('Welcome  '+ username)
>>>>>>> 753ffaf20921bec9494277ecb88e21084f4cd076
        } else {
            alert('username or password incorrect')
        }
    };
})


document.getElementById("signUP").addEventListener("click", function (e) {
<<<<<<< HEAD
    // console.log(" ca marche ");
=======
>>>>>>> 753ffaf20921bec9494277ecb88e21084f4cd076
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