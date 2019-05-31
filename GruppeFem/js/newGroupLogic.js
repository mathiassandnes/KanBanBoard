



let names = [];


// gjør at names blir et array av alle navn i databasen
for(let i = 0; i < users.length; i++){
    names.push(users[i].name);
}

//alfabetisk rekkefølge
names.sort();

ul = document.getElementById("search-result");
ul.style = "list-style: none; padding: 0;"

var render_lists = function(lists){
    var li = "";
    for(index in lists){
        li += "<li>" + lists[index] + "</li>";
    }
    ul.innerHTML = li;
}

render_lists(names);

// lets filters it
input = document.getElementById('user-search-input');

var filterUsers = function(event){
    keyword = input.value.toLowerCase();
    filtered_users = names.filter(function(user){
        user = user.toLowerCase();
        return user.indexOf(keyword) > -1;
    });

    render_lists(filtered_users);
}

input.addEventListener('keyup', filterUsers);




    //trykker man på et navn, legges de til i listen



























