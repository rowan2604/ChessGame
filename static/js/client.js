class Client{
    constructor(){
        try {
            this.socket = io('http://localhost:0905');
          }
        catch {
            if (confirm("Error, We cannot access the server...\nRestart the server and press ok to try again.")) {
                location.reload()
            }
            else {
                windows.stop();
            }
        }

        this.socket.on('setup', data => {
            if(data == "wait"){
                document.getElementById("Connection").style.visibility = "hidden";
                document.getElementById("Wait").style.visibility = "visible";
            }
            else if(data == "full"){
                alert("A game has already started...");
            }
            else {
                username.push(data);
                document.getElementById("Connection").style.visibility = "hidden";
                document.getElementById("Wait").style.visibility = "hidden";
                document.getElementById("Phaser").style.visibility = "visible";
                console.log(username);
            }
        })

        this.socket.on('draw', data => {
            console.log(data)
            let graphics = game.add.graphics(200, 50);
            drawAvailableMoves(data.availableMoves, data.state, graphics, data.color, data.size);
        });

        this.socket.on('move', destination => {
            let i = 0;
            console.log("move")
        });
       
    }

    send(type, message){
        this.socket.emit(type, message);
    }
}