let client = new Client();
<<<<<<< HEAD
let  username = []; 
username.push("Guest"); //if you want recup an username, [0] current username, [1] username opponent.

=======
if (sessionStorage.username != undefined) {
    let usernameJSON = sessionStorage.getItem("username");
    username = JSON.parse(usernameJSON)
    console.log(username);
}
>>>>>>> 5753141e9435aeb5df103220604a366425cbf63d
