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


function registerNewUser(){
    users.push({
        name: document.getElementById("full-name").value,
        email: document.getElementById("email").value,
        username: document.getElementById("new-username").value,
        password: document.getElementById("new-password").value

    });
alert("you have been registrated")
}
