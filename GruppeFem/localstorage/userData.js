// lagrer hvem som logget seg på i localstrorage.

var currentUser= localStorage.getItem('currentUser');
document.getElementById('currentUser').innerHTML = "Logged in as: " + currentUser;