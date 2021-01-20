
//Storing the values of username and login
function logMeIn(){
    let userName = (document.getElementById("username-id").value).trim();
    let apiKey = (document.getElementById("api-id").value).trim();
    let dataFromLogin = [userName,apiKey];
    if(userName && apiKey){
        document.getElementById("login-btn").setAttribute("href","contentMain.html");
        localStorage.setItem( 'objectToPass', dataFromLogin);
    }
}
   

