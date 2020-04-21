document.getElementById('playB').addEventListener("click", function () {
    client.send('username', username[0]);
})


function signIN() {
    document.getElementById("signIN").addEventListener("click", function (e) {
        //créer un compte en bdd
        var username = document.getElementById("input_username").value;
        var password = document.getElementById("input_password").value;
        var body = {
            username: username,
            password: password,
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
                alert('Inscription Reussie , Veuillez vous connecter')
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
function name(){
    document.getElementById("name").addEventListener('', function (e) {
        signIN();
        var username = document.getElementById("input_username").value;
        print(username);
    });
}