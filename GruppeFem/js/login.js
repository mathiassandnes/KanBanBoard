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
function registerNewUserNameCheck() {

}
//---------------------------------------EMAIL------------------------------------------------------------

function registerNewEmailCheck() {
    //Check if email is valid:
    let newEmail = document.getElementById("email").value;

    if (newEmail.indexOf('@') > -1 && newEmail.indexOf('.') > -1) {
        alert("Email taken");
        return true;
    }
}

function newEmailWrong(){
    if (registerNewEmailCheck() === false){
        document.getElementById("email").className = "glyphicon glyphicon-warning-sign form-control-feedback";
    }
}
//--------------------------------------PASSWORD----------------------------------------------------------

function NewPasswordCheck() {

}

function newPasswordMatch() {
    let newPassword1 = document.getElementById("new-password").value;
    let newPassword2 = document.getElementById("new-password-check").value;

    if (newPassword1 === newPassword2) {
        return true;
    }
}

function differentPasswords(){
    if(newPasswordMatch() === false){
        document.getElementById("new-password").className; //=
    }
}
//----------------------------------------NAME------------------------------------------------------------
function registerNewName() {

}

function registerNewUser(){

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
