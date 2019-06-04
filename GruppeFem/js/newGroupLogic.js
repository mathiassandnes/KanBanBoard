
let usernames = [];
let members = [];

// gjør at names blir et array av alle navn i databasen
for (let i = 0; i < users.length; i++) {
  usernames.push(users[i].username);
}
//alfabetisk rekkefølge
usernames.sort();

ul = document.getElementById("search-result");
ul.style = "list-style: none; padding: 0;"

var render_lists = function (lists) {
  var li = "";
  for (index in lists) {
    li += "<li>" + '<button onclick="addClickInput(\'' + lists[index] + '\')" class = btn-primary> ' + lists[index] + "</button>" + "</li>";
  }
  ul.innerHTML = li;
}
render_lists(usernames);

// lets filters it
input = document.getElementById('user-search-input');

var filterUsers = function (event) {
  keyword = input.value.toLowerCase();
  filtered_users = usernames.filter(function (user) {
    user = user.toLowerCase();
    return user.indexOf(keyword) > -1;
  });

  render_lists(filtered_users);
}

input.addEventListener('keyup', filterUsers);

//trykker man på et navn, legges de til i listen

function addClickInput(username) {
  // 1. legges til i members liste

  members.push(username);

  let membersString = '';

  for (let x = 0; x < members.length; x++) {

     membersString += '<button class= btn-primary id = btn' + x + ' onclick = removeClickInput(' + x + ') >' + members[x] + '</button>';
     membersString += '<button class= btn-primary id = xbtn' + x + ' onclick= removeClickInput(' + x + ') >' + "X" + '</button>';
  }
     document.getElementById("members").innerHTML = membersString;

     //3. Laste inn listene på nytt til siden
    }
function removeClickInput(id) {
  
  members.pop(id)
  let removeButton = document.getElementById('btn' + id);
  removeButton.parentNode.removeChild(removeButton);
  let removeXButton = document.getElementById('xbtn' + id );
  removeXButton.parentNode.removeChild(removeXButton);
  console.log(members);

}