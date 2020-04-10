document.getElementById('logB').addEventListener("click", function(){
    const username = document.getElementById("usernameI").value;
    console.log(username);
    client.send('username', username);
  });

  document.getElementById('sendB').addEventListener("click", function(){
    const username = document.getElementById("usernameI").value;
    console.log(username);
    client.send('play', username);
  });