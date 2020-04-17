document.getElementById('playB').addEventListener("click", function(){
    client.send('username', username[0]);
})

function elements(){
    document.getElementById("informations").addEventListener("click",function(e){
        var error;
        var username=document.getElementById("user");
        var password=document.getElementById("pass");
        
        if(!username.value){
            error="Veuillez entrer un nom de joueur";
        }else{
           //on range son nom ds la bdd
        }
        if(!password.value){
            error="Veuillez entrer un mot de passe";
        }else{
            //on range son mdp dans la bdd
        }
        if(erreur){
            e.preventDefault();//si il n'y a rien d'entrer
            document.getElementById("erreur").innerHTML=erreur; //on écrit l'erreur correspondante.
            return false;
        }else{
            alert("c'est bon frérot");
        }
 
    })
}
function signIN(){
    document.getElementById("signIN").addEventListener("click",function(e){
        //elements();
        console.log("rowan ntm et connecte toi");
        //créer un compte en bdd
    })
}

function signUP(){
    document.getElementById("signUP").addEventListener("click",function(e){
        console.log("rowan t un connard mais ca marche ");
        //elements();
        //comparer avec les comptes initialement créer
    })

}