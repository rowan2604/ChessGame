let client = new Client();
if(sessionStorage.name === undefined){
    let name = [];
} else {
    let nameJSON = sessionStorage.getItem("name");
    let name = JSON.parse(nameJSON)
}
console.log(name);
