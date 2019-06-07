function renderLists (lists) {
  let li = "";
  for (let i = 0; i < lists.length; i++) {
      li += "<li>" + '<button id='+i+' onclick="addClickInput(\'' + lists[i] + '\')" class = btn-primary>' + lists[i] + "</button>" + "</li>";
  }
  ul.innerHTML = li;
}

function filterUsers () {
    let keyword = input.value.toLowerCase();
    let filtered_users = names.filter(function (user) {
        user = user.toLowerCase();
        return user.indexOf(keyword) > -1;
  });

  renderLists(filtered_users);
}

//trykker man på et navn, legges de til i listen
function addClickInput(name) {
    members.push(name);
    let membersString = '';

    for (let i = 0; i < members.length; i++) {
        if(members[i] !== null) {
            membersString += '<button class="btn-primary" id="btn'+i+'" onclick="removeClickInput('+i+')" >'+members[i]+'</button>';
        }
    }
    document.getElementById("members").innerHTML = membersString;
}

function removeClickInput(id)  {
    console.log(members[id])
    members[id] = null;
    let removeButton = document.getElementById('btn' + id);
    removeButton.parentNode.removeChild(removeButton);
}

function checkNotNull(name){ 
  return null != name;
}

function setMembersNotNull(){
    members = members.filter(checkNotNull);
}

//----------------------------Group saved snack ------------------------------------------
function groupSavedSnack() {
    var x = document.getElementById("group-saved-snackbar");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}

function groupModal(target){

    let groupNameInModal = document.getElementById('group-name-group-modal');
    let groupDescriptionInModal = document.getElementById('group-description-group-modal');

    document.getElementById('members').innerHTML = "";
    members = [];


    let isNewGroup = true;
    let currentGroup;
    for(let i = 0; i < group.length; i++){
        if(group[i].name === target.innerHTML){
            currentGroup = group[i];
            console.log(currentGroup.members)

            groupNameInModal.value = currentGroup.name;
            groupDescriptionInModal.value = currentGroup.description;

            console.log(currentGroup.members)

            for(let j = 0; j < currentGroup.members.length; j++){
                addClickInput(currentGroup.members[j]);
            }

            isNewGroup = false;
        }
    }
    if(isNewGroup){
        groupNameInModal.value = "";
        groupDescriptionInModal.value = "";
    }

    document.getElementById('create-new-group').onclick = function(){
        if(isNewGroup){
            currentGroup = {
                name: groupNameInModal.value,
                boards: [],
                members: members,
                description: groupDescriptionInModal.value
            };

            group.push(currentGroup);
            lagGruppe();
        }else{
            currentGroup.name = groupNameInModal.value;
            currentGroup.members = members;
            currentGroup.description = groupDescriptionInModal.value;
            target.innerHTML = groupNameInModal.value;
        }


    }
}

function createGroup(){
    groupSavedSnack();
    setMembersNotNull();

    let newGroup = {
        name: document.getElementById("group-name-input").value,
        boards: [],
        members: members
    };
    group.push(newGroup);

    lagGruppe();



}


let names = [];
let members = [];


// gjør at names blir et array av alle navn i databasen
for (let i = 0; i < users.length; i++) {
    names.push(users[i].name);
}
//alfabetisk rekkefølge
names.sort();

ul = document.getElementById("search-result");

// lets filters it
renderLists(names);

let input = document.getElementById('user-search-input');
input.addEventListener('keyup', function(){filterUsers()});

document.getElementById("new-group-button").onclick = function (e){groupModal(e.target)}
