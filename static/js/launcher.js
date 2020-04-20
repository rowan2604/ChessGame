document.getElementById('playB').addEventListener("click", function () {
    client.send('username', username[0]);
})

function elements() {
    document.getElementById("informations").addEventListener("click", function (e) {
        var error;
        var username = document.getElementById("user");
        var password = document.getElementById("pass");

        if (!username.value) {
            error = "Veuillez entrer un nom de joueur";
        } else {
            //on range son nom ds la bdd
        }
        if (!password.value) {
            error = "Veuillez entrer un mot de passe";
        } else {
            //on range son mdp dans la bdd
        }
        if (erreur) {
            e.preventDefault(); //si il n'y a rien d'entrer
            document.getElementById("erreur").innerHTML = erreur; //on écrit l'erreur correspondante.
            return false;
        } else {
            alert("c'est bon frérot");
        }

    })
}

function signIN() {
    document.getElementById("signIN").addEventListener("click", function (e) {
        //créer un compte en bdd
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
}

function signUP() {
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


        //elements();
        //comparer avec les comptes initialement créer
    })



}