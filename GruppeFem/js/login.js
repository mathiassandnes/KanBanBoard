var usersLogIn = [
    {
        username: "markus",
        password: "1234"
    },
    {
        username: "test",
        password: "12345"
    },
    {
        username: "bruker",
        password: "passord"
    }
]

function checkLogIn() {

    var username = document.getElementById("username").value
    var password = document.getElementById("password").value

    for (i = 0; i > users.length; i++) {

        if (username == usersLogIn.username && password == usersLogIn.password) {

            alert ("Du er logget inn");

        } else {

            alert ("Feil");

        }
    }
}