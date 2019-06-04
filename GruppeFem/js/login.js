//---------------------------------------->>Login<<---------------------------------------------
function checkLogIn() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    for(let i = 0; i < users.length; i++) {

        if(username == users[i].username){
            if(password == users[i].password){
                document.getElementById("username").className = "form-control m-1 is-valid";
                document.getElementById("password").className = "form-control m-1 is-valid";
                localStorage.setItem('currentUser', username);
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
window.addEventListener("keydown", loginWithEnter, false);

function loginWithEnter(key){
    if(key.keyCode == 13){
        checkLogIn();
       }
}
//---------------------------->>Disable keyEvent for registration modal<<-----------------------
function disableLoginWithEnter() {
    window.removeEventListener("keydown", loginWithEnter, false);
}
//------------------------------------>>USERNAME<<----------------------------------------------
var validUsername;


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

function newUsernameHaveChar(){
    if((document.getElementById("new-username").value).length > 0){
        return true;
    }else{
        console.log("No username detected");
        return false;
    }
}

function newUsernameHaveCharFeedback(){
    if(newUsernameHaveChar()=== false){
        document.getElementById("new-username").className = "form-control is-invalid";
        document.getElementById("new-username-taken-feedback").innerHTML = "Enter a username";
    } else {
        return true;
    }
}

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

function registerNewEmailCriteria() {

    if ((document.getElementById("email").value).indexOf('@') > -1 && (document.getElementById("email").value).indexOf('.') > -1){
        return true;
    } else{
        console.log("enter valid email");
    }
}

function newEmailHaveChar() {
    if ((document.getElementById("email").value).length > 0){
        return true;
    }else{
        console.log("No email detected");
        return false;
    }
}

function newEmailHaveCharFeedback(){
    if(newEmailHaveChar() === false){
        document.getElementById("email").className = "form-control is-invalid";
    }
}

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

function newPasswordMatch() {
    let newPassword1 = document.getElementById("new-password").value;
    let newPassword2 = document.getElementById("new-password-check").value;

    if (newPassword1 === newPassword2) {
        return true;
    } else {
        return false;
    }
}

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
function passwordCriteriaFeedback(){
    if(passwordCriteriaOk() === true){
        document.getElementById("new-password").className = "form-control is-valid";
    } else {
        document.getElementById("new-password").className = "form-control is-invalid";
    }
}
//---------------------------------------->>NAME<<----------------------------------------------
function newNameHaveChar() {
    if((document.getElementById("full-name").value).length > 0){
        return true;
        console.log("Name is good");
    }else{
        return false;
        console.log("No name detected");
    }
}

function newNameFeedback(){
    if(newNameHaveChar() === true){
        document.getElementById("full-name").className = "form-control is-valid";
    } else {
        document.getElementById("full-name").className = "form-control is-invalid";
    }
}
//------------------------------->>Login SNACKBAR<<---------------------------------------------
function loginFailedSnack() {
    var x = document.getElementById("loginFailedSnackbar");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}
//----------------------------->>Registration SNACKBAR<<----------------------------------------
function registrationCompleteSnack() {
    var x = document.getElementById("registrationSnackbar");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}

//--------------------------------------->>Create user<<----------------------------------------

function registerNewUserCriteria() {
    if (newNameHaveChar() && newPasswordMatch() && passwordCriteriaOk() && registerNewEmailCriteria() && !newEmailDuplicate() && !newUsernameDuplicateCheck() && newEmailHaveChar() && newUsernameHaveChar()){
            return true;
        }
}
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

console.log(users);
}