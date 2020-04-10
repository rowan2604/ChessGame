class Client{
    constructor(){
        try {
            this.socket = io('http://localhost:905');
            this.socket.on('play', data => {
                document.getElementById('receiveMessageP').innerHTML = data;
            })
          }
          catch {
            if (confirm("Please start the server and click on 'OK'...")) {
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