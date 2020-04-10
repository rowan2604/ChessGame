class Client{
    constructor(){
        try {
            this.socket = io('http://localhost:0905');
            this.socket.on('play', data => {
                document.getElementById('receiveMessageP').innerHTML = data;
            })
          }
          catch {
            if (confirm("Error, We cannot access the server...\nRestart the server and press ok to try again.")) {
                location.reload()
            }
            else {
                windows.stop();
            }
          }
    }

    send(type, message){
        this.socket.emit(type, message);
    }
}