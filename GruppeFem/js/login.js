//---------------------------------------->>Login<<---------------------------------------------
//Sjekker om username er username og passord er i users[].
function checkLogIn() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    for(let i = 0; i < users.length; i++) {

        if(username == users[i].username){
            if(password == users[i].password){
                document.getElementById("username").className = "form-control m-1 is-valid";
                document.getElementById("password").className = "form-control m-1 is-valid";
                localStorage.setItem('currentUser', users[i].name);
                window.location.replace("home.html");
                return;
            }
        }
    }

    loginFailedSnack();
    document.getElementById("username").className = "form-control m-1 is-invalid";
    document.getElementById("password").className = "form-control m-1 is-invalid";
    return;
}
//--------------------------------->>Enter keyEvent for login<<---------------------------------
// Gir mulighet å logge inn med enter.
window.addEventListener("keydown", loginWithEnter, false);

function loginWithEnter(key){
    if(key.keyCode == 13){
        checkLogIn();
       }
}
//------------------------------------>>USERNAME<<----------------------------------------------
var validUsername;

//ser om brukernavnet er tatt.
function newUsernameDuplicateCheck() {
    if (document.getElementById("new-username").value === validUsername){
        return false;
    }
    for(let i=0;i<users.length;i++){
        if(users[i].username === document.getElementById("new-username").value){
            return true;
        }
    }
    validUsername = document.getElementById("new-username").value;
    return false;
}
//ser om brukernavnet har tegn.
function newUsernameHaveChar(){
    if((document.getElementById("new-username").value).length > 0){
        return true;
    }else{
        console.log("No username detected");
        return false;
    }
}

//feedback på om brukernavnet har tegn.
function newUsernameHaveCharFeedback(){
    if(newUsernameHaveChar()=== false){
        document.getElementById("new-username").className = "form-control is-invalid";
        document.getElementById("new-username-taken-feedback").innerHTML = "Enter a username";
    } else {
        return true;
    }
}

//feedback hvis brukernavn er unikt og har tegn.
function newUsernameFeedback(){
    if(newUsernameDuplicateCheck() === true){
        document.getElementById("new-username").className = "form-control is-invalid";
    } else {
        document.getElementById("new-username").className = "form-control is-valid";
    }

    if(newUsernameHaveChar() === true && newUsernameDuplicateCheck() === true){
        document.getElementById("new-username-taken-feedback").innerHTML = "Username taken";
    }

}
//----------------------------------------->>EMAIL<<--------------------------------------------
var validEmail;

//ser om email er brukt av eksisterende bruker.
function newEmailDuplicate() {
    if (document.getElementById("email").value === validEmail){
        return false;
    }
    for(let i=0;i<users.length;i++){
        if(users[i].email === document.getElementById("email").value){
            return true;
        }
    }
    validEmail = document.getElementById("email").value;
    return false;
}

//ser om email inneholder "." og "@".
function registerNewEmailCriteria() {

    if ((document.getElementById("email").value).indexOf('@') > -1 && (document.getElementById("email").value).indexOf('.') > -1){
        return true;
    } else{
        console.log("enter valid email");
    }
}

//ser om email har tegn.
function newEmailHaveChar() {
    if ((document.getElementById("email").value).length > 0){
        return true;
    }else{
        console.log("No email detected");
        return false;
    }
}

//feedback hvis email ikke har tegn.
function newEmailHaveCharFeedback(){
    if(newEmailHaveChar() === false){
        document.getElementById("email").className = "form-control is-invalid";
    }
}

//feedback på om email er godkjent.
function newEmailFeedback(){
    if (registerNewEmailCriteria() === true){
        document.getElementById("email").className = "form-control is-valid";
    } else {
        document.getElementById("email").className = "form-control is-invalid";
        document.getElementById("new-email-feedback-text").innerHTML = "Enter a valid email";
    }

    if(newEmailDuplicate()=== true && registerNewEmailCriteria() === true){
        document.getElementById("email").className = "form-control is-invalid";
        document.getElementById("new-email-feedback-text").innerHTML = "Email already in use";
    }
}



//-------------------------------------->>PASSWORD<<--------------------------------------------

// ser om nye passord er like.
function newPasswordMatch() {
    let newPassword1 = document.getElementById("new-password").value;
    let newPassword2 = document.getElementById("new-password-check").value;

    if (newPassword1 === newPassword2) {
        return true;
    } else {
        return false;
    }
}

//feedback på nye passord.
function differentPasswordsFeedback(){

    if(newPasswordMatch() === false && passwordCriteriaOk() === true){
        document.getElementById("duplicate-password-text").innerHTML = "Passwords do not match";
    } else if(newPasswordMatch() === true || passwordCriteriaOk() === false){
        document.getElementById("duplicate-password-text").innerHTML = "";
    }

    if(newPasswordMatch() === true && passwordCriteriaOk() === true){
        document.getElementById("new-password-check").className = "form-control is-valid";

        console.log("passwords match");
    } else {
        document.getElementById("new-password-check").className = "form-control is-invalid";
        console.log("passwords do not match");
    }

}

//ser om passord er innenfor kriteriene som er gitt.
function passwordCriteriaOk(){
    let newPassword1 = document.getElementById("new-password").value;

    if((document.getElementById("new-password").value).length > 7) {
        console.log("Good password length");

        if (/\d/.test(newPassword1) === true) {
            console.log("password have a number");

            if (newPassword1 !== newPassword1.toUpperCase() && newPassword1 !== newPassword1.toLowerCase()) {
                console.log("password have upper and lower case");
                return true;
            }else{
                console.log("passwords need upper and lower case");
                return false;

            }
        }else{
            console.log("password need a number");
            return false;
        }
    }else{
        console.log("passwords needs to be 8 or more characters");
        return false;
    }
}
//feedback på om passord er godkjent eller ikke.
function passwordCriteriaFeedback(){
    if(passwordCriteriaOk() === true){
        document.getElementById("new-password").className = "form-control is-valid";
    } else {
        document.getElementById("new-password").className = "form-control is-invalid";
    }
}
//---------------------------------------->>NAME<<----------------------------------------------

//ser om navnet har tegn.
function newNameHaveChar() {
    if((document.getElementById("full-name").value).length > 0){
        return true;
        console.log("Name is good");
    }else{
        return false;
        console.log("No name detected");
    }
}
//feedback på om navnet er godkjent eller ikke.
function newNameFeedback(){
    if(newNameHaveChar() === true){
        document.getElementById("full-name").className = "form-control is-valid";
    } else {
        document.getElementById("full-name").className = "form-control is-invalid";
    }
}
//------------------------------->>Login SNACKBAR<<---------------------------------------------
//snackbar for mislykket innlogging.
function loginFailedSnack() {
    var x = document.getElementById("loginFailedSnackbar");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}
//----------------------------->>Registration SNACKBAR<<----------------------------------------
//snackbar for fullført registrering.
function registrationCompleteSnack() {
    var x = document.getElementById("registrationSnackbar");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}

//--------------------------------------->>Create user<<----------------------------------------
//Ser om alle kriteriene for å lage ny bruker er møtt.
function registerNewUserCriteria() {
    if (newNameHaveChar() && newPasswordMatch() && passwordCriteriaOk() && registerNewEmailCriteria() && !newEmailDuplicate() && !newUsernameDuplicateCheck() && newEmailHaveChar() && newUsernameHaveChar()){
            return true;
        }
}

//lager ny bruker.
function registerNewUser() {
    if(registerNewUserCriteria()) {
        users.push({
            name: document.getElementById("full-name").value,
            email: document.getElementById("email").value,
            username: document.getElementById("new-username").value,
            password: document.getElementById("new-password").value
        });
        registrationCompleteSnack();
    }
    newNameFeedback();
    newUsernameFeedback();
    newEmailFeedback();
    passwordCriteriaFeedback ();
    differentPasswordsFeedback();
    newUsernameHaveCharFeedback();
    newEmailHaveCharFeedback();

    if(registerNewUserCriteria()) {
        validEmail = "";
        validUsername = "";
    }
}