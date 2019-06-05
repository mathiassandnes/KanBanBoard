
var names = [];
var members = [];


// gjør at names blir et array av alle navn i databasen
for (let i = 0; i < users.length; i++) {
  names.push(users[i].name);
}
//alfabetisk rekkefølge
names.sort();

ul = document.getElementById("search-result");

function render_lists (lists) {
  var li = "";
  for (let index in lists) {
    li += "<li>" + '<button onclick="addClickInput(\'' + lists[index] + '\')" class = btn-primary> ' + lists[index] + "</button>" + "</li>";
  }
  ul.innerHTML = li;
}



function filterUsers () {
  let keyword = input.value.toLowerCase();
  let filtered_users = names.filter(function (user) {
    user = user.toLowerCase();
    return user.indexOf(keyword) > -1;
  });

  render_lists(filtered_users);
}


//trykker man på et navn, legges de til i listen

function addClickInput(name) {
  // 1. legges til i members liste

  members.push(name);

  let membersString = '';

  for (let i = 0; i < members.length; i++) {
      if(members[i] !== null){
        membersString += '<button class="btn-primary" id="btn'+i+'" onclick="removeClickInput('+i+')" >'+members[i]+'</button>';
        membersString += '<button class="btn-primary" id="xbtn'+i+'" onclick="removeClickInput('+i+')" >'+"X"+'</button>';
      }
  }
     document.getElementById("members").innerHTML = membersString;

     //3. Laste inn listene på nytt til siden
}

function removeClickInput(id)  {
  members[id] = null;
  let removeButton = document.getElementById('btn' + id);
  removeButton.parentNode.removeChild(removeButton);
  let removeXButton = document.getElementById('xbtn' + id );
  removeXButton.parentNode.removeChild(removeXButton);
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
    console.log(target.innerHTML);
    let groupNameInModal = document.getElementById('group-name-group-modal');
    let groupDescriptionInModal = document.getElementById('group-description-group-modal');


    let isNewGroup = true;
    let currentGroup;
    for(let i = 0; i < group.length; i++){
        if(group[i].name === target.innerHTML){
            currentGroup = group[i];
            groupNameInModal.value = currentGroup.name;
            groupDescriptionInModal.value = currentGroup.description;

            // lager et array med navn
            for(let j = 0; j < currentGroup.members.length; j++){
                addClickInput(currentGroup.members[j].name);
            }

            //LEGGE TIL DESCRIPTION OG SÅNT


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
                description: groupDescriptionInModal
            };

            group.push(currentGroup);
            lagGruppe();
        }else{
            currentGroup.name = groupNameInModal.value;
            currentGroup.members = members;
            currentGroup.description = groupDescriptionInModal;
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
// lets filters it
render_lists(names);

let input = document.getElementById('user-search-input');
input.addEventListener('keyup', function(){filterUsers()});

document.getElementById("new-group-button").onclick = function (e){groupModal(e.target)}
