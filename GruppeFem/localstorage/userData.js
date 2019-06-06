// lagrer hvem som er logget på i localstrorage.

var currentUser= localStorage.getItem('currentUser');
document.getElementById('currentUser').innerHTML = "Logged in as: " + currentUser;