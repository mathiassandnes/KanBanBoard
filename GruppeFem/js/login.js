function checkLogIn() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    for(let i = 0; i < users.length; i++) {

        if(username == users[i].username){
            if(password == users[i].password){
                console.log("Success");
                window.location.replace("home.html");

            } else {console.log("Wrong Password")}
        } else {console.log("Wrong Username")}
    }

    return;
}

//--------------------------------------USERNAME----------------------------------------------------------
//var validUsername;

function newUsernameDuplicateCheck() {
    if (document.getElementById("new-username").value === validUsername){
        return false;
    }
    for(let i=0;i<users.length;i++){
        if(users[i].username === document.getElementById("new-username").value){

            return true;
        } else {
            var validUsername = document.getElementById("new-username").value;
            return false;
        }
    }
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
    }
}

function newUsernameFeedback(){
    if(newUsernameDuplicateCheck() === true){
        document.getElementById("new-username").className = "form-control is-invalid";
    } else {
        document.getElementById("new-username").className = "form-control is-valid";
    }
}
//---------------------------------------EMAIL------------------------------------------------------------

function registerNewEmailCriteria() {

    if ((document.getElementById("email").value).indexOf('@') > -1 && (document.getElementById("email").value).indexOf('.') > -1) {
        return true;
    } else{
        console.log("enter valid email");
    }
}

function newEmailHaveChar() {
    if((document.getElementById("email").value).length > 0){
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
    }
}

//--------------------------------------PASSWORD----------------------------------------------------------

function newPasswordMatch() {
    let newPassword1 = document.getElementById("new-password").value;
    let newPassword2 = document.getElementById("new-password-check").value;

    if (newPassword1 === newPassword2) {
        return true;
    }
}

function differentPasswordsFeedback(){
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
//----------------------------------------NAME------------------------------------------------------------
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


//-----------------------------------------------------------------------------------------------------------

function registerNewUser() {
    if(newNameHaveChar() && newPasswordMatch() && passwordCriteriaOk() && registerNewEmailCriteria() && !newUsernameDuplicateCheck() && newEmailHaveChar() && newUsernameHaveChar()) {
        users.push({
            name: document.getElementById("full-name").value,
            email: document.getElementById("email").value,
            username: document.getElementById("new-username").value,
            password: document.getElementById("new-password").value
        });

        console.log("ny bruker opprettet");
    }
    newNameFeedback();
    newUsernameFeedback();
    newEmailFeedback();
    passwordCriteriaFeedback ();
    differentPasswordsFeedback();
    newUsernameHaveCharFeedback();
    newEmailHaveCharFeedback();


console.log(users);
}



/*
function registerNewUser() {

//Check if email is valid:
    let newEmail = document.getElementById("email").value;

    if (newEmail.indexOf('@') > -1 && newEmail.indexOf('.') > -1) {
        var newEmailCheck = true;
    }else {
        console.log("Invalid email");
    }

//Check if password is valid:
    let newPassword1 = document.getElementById("new-password").value;
    let newPassword2 = document.getElementById("new-password-check").value;

    if (newPassword1 === newPassword2){
        console.log("passwords match");

            if(newPassword1.length > 7){
                    console.log("Good password length");

                    if(/\d/.test(newPassword1) === true){
                        console.log("password have a number");

                        if(newPassword1 !== newPassword1.toUpperCase() && newPassword1 !== newPassword1.toLowerCase()){
                            console.log("password have upper and lower case");
                            var newPasswordCheck = true;

                        }else{
                            console.log("password does not have upper and lower case");
                        }
                    }else{
                        console.log("password needs a number");
                    }
            }else {
                console.log("Password must be at least 8 characters");
            }
    }else{
        console.log("Passwords do not match");
    }

//Check if username is taken:
    let newUsername = document.getElementById("new-username").value;
    var newUsernameCheck = true;

    for(let i=0;i<users.length;i++){
        if(users[i].username === newUsername){
            console.log("username taken");
            newUsernameCheck = false;
        }
    }

    if (newEmailCheck === true && newPasswordCheck === true && newUsernameCheck === true) {

        users.push({
            name: document.getElementById("full-name").value,
            email: document.getElementById("email").value,
            username: document.getElementById("new-username").value,
            password: document.getElementById("new-password").value
        });

        console.log("you have been registrated");
    }


    console.log(users);


}
*/