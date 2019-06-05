



let names = [];
let members = [];


// gjør at names blir et array av alle navn i databasen
for (let i = 0; i < users.length; i++) {
  names.push(users[i].name);

}

//alfabetisk rekkefølge
names.sort();

ul = document.getElementById("search-result");

var render_lists = function (lists) {
  var li = "";
  for (index in lists) {
    li += "<li>" + '<button onclick="addClickInput(\'' + lists[index] + '\')" class = btn-primary> ' + lists[index] + "</button>" + "</li>";


  }
  ul.innerHTML = li;
}

render_lists(names);

// lets filters it
input = document.getElementById('user-search-input');

var filterUsers = function (event) {
  keyword = input.value.toLowerCase();
  filtered_users = names.filter(function (user) {
    user = user.toLowerCase();
    return user.indexOf(keyword) > -1;
  });

  render_lists(filtered_users);
}

input.addEventListener('keyup', filterUsers);




//trykker man på et navn, legges de til i listen

function addClickInput(name) {
  // 1. legges til i members liste

  members.push(name);

  let membersString = '';

  for (let x = 0; x < members.length; x++) {

    membersString += '<button class= btn-primary id = x>' + members[x] + '</button>';
    membersString += '<button class= btn-primary id = x  onclick= removeClickInput(this.id) >' + "X" + '</button>';









  }

  document.getElementById("members").innerHTML = membersString;



  console.log(members);


  //3. Laste inn listene på nytt til siden

}


function removeClickInput(id) {

  let removeButton = document.getElementById(id );
  removeButton.parentNode.removeChild(removeButton);
  members.splice(id, 1);



}