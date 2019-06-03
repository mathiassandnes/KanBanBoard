function changeTavle(id){
    let modal = document.getElementById("link-Tavle");
    let tavleName = document.getElementById(id);
    modal.innerHTML = "gå til " + tavleName.innerHTML;
    let hiddenHead = document.getElementById("tavle-Head");
    hiddenHead.innerHTML = id;
}

function lagGruppe(){
    for(let i=0; i < group.length; i++){
        let gruppelist = document.createElement("table");
        let groupBody = document.getElementById("gruppe-Body");
        gruppelist.setAttribute("id",group[i].name + i);
        gruppelist.setAttribute("numb",i);
        let addButton = document.createElement("button");
        addButton.setAttribute("class", "btn btn-info btn-sm");
        addButton.innerHTML = "Legg til tavle";
        gruppelist.innerHTML = group[i].name;
        groupBody.appendChild(gruppelist);
        gruppelist.appendChild(addButton);

        addButton.setAttribute("data-toggle","modal");
        addButton.setAttribute("data-target","#myModal");
        addButton.setAttribute("numb",i);
        addButton.setAttribute("id","button"+i);
        addButton.setAttribute("onclick","sendId(this.id)");
        gruppelist.setAttribute("class","column");

        let tavleList = document.createElement("tr");
        tavleList.setAttribute("id","tr"+i);
        tavleList.setAttribute("numb", i);
        let gruppeliste = document.getElementById(group[i].name + i);
        gruppeliste.appendChild(tavleList);

        function lagTavle() {
            let arrayOfTavler = group[i].boards;
            for(let k = 0; k < arrayOfTavler.length;k++){
                let tavle = document.createElement("td");
                let tavleList = document.getElementById("tr"+i);
                tavleList.appendChild(tavle);
                let arrayOfBoards = group[i].boards;
                let arrayOfTables = arrayOfBoards[k].name;
                tavle.innerHTML = arrayOfTables;
                tavle.setAttribute("class","btn btn-info btn-lg");
                tavle.setAttribute("data-toggle","modal");
                tavle.setAttribute("data-target","#myTavleModal");
                tavle.setAttribute("id",arrayOfTables + i + k);
                tavle.setAttribute("onclick","changeTavle(this.id)");
                tavle.setAttribute("numb", k);
            }
        }


        lagTavle(board);



    }
}

function findObjectByName(array, key, value) {
    for (var i = 0; i < array.length; i++) {
        if (array[i][key] === value) {
            return array[i];
        }
    }
    return null;
}

lagGruppe();

function removeInput(){
    let input = document.getElementById("bruker-Input");
    input.value = "";
}

function renameTavle() {
    let thisTavle = document.getElementById("tavle-Head");
    let hiddenID = thisTavle.innerHTML;
    let newName = document.getElementById("change-Input");
    let thisTavleOut = document.getElementById(hiddenID);
    let trTag = thisTavleOut.parentElement;
    let groupIndex = trTag.getAttribute("numb");
    let arrayOfGroup = group[groupIndex];
    let nameExists = false;
    for(let l = 0; l <group[groupIndex].boards.length;l++) {
        if (newName.value === "") {
            alert("Vennligst oppgi nytt navn.");
            newName.value = "";
        } else if (newName.value === arrayOfGroup.boards[l].name) {
            nameExists = true;

        }
    }

    function getIndex(name) {
        return name = thisTavleOut.innerHTML;
    }

    if(nameExists === true) {
        alert("Det er allerede en tavle med dette navnet. Vennligst velg et annet navn.");
    } else {
        for(let o = 0; o <group[groupIndex].boards.length; o++){
            if(thisTavleOut.innerHTML === group[groupIndex].boards[o].name){
                var thisIndex = o;
            }  else{

            }
        }
        alert(thisIndex);
        let arrayOfBoards = group[groupIndex].boards;
        alert(group[groupIndex].boards[thisIndex].name);
        arrayOfBoards[thisIndex].name = newName.value;
        alert(arrayOfBoards[thisIndex].name);
        thisTavleOut.innerHTML = newName.value;
        alert(group[groupIndex].boards[thisIndex].name);
    }
    thisTavleOut.setAttribute("id", newName.value + groupIndex +thisIndex);
    newName.value = "";
}

function removeChangeInput(){
    let input = document.getElementById("change-Input");
    input.value = "";
}

function lagExtraTavle(){

    let hiddenHead = document.getElementById("hiddenModal").innerHTML;
    let thisValue = document.getElementById(hiddenHead);
    let groupIndex = thisValue.getAttribute("numb");
    let sameName = false;
    let nyTavleInput = document.getElementById("bruker-Input");
    for (let j = 0; j < group[groupIndex].boards.length; j++){
        if (group[groupIndex].boards[j].name === nyTavleInput.value){
            alert("oof");
            sameName = true;
        }
    }

    if(nyTavleInput.value === ""){
        alert("Vennligst skriv inn et navn");
    } else if(sameName === true) {
        alert("Dette navnet blir allerede brukt i denne gruppen. Vennligst skriv inn et annet navn.");
        nyTavleInput.value = "";
    } else {


    let tavleIndex = group[groupIndex].boards.length;
    let newtavle =
    {
        name:nyTavleInput.value,
        lists: [],
        member: [],
    };

    group[groupIndex].boards.push(newtavle);
    board.push(newtavle);
    let tavle = document.createElement("td");
    let tavleList = document.getElementById("tr" + groupIndex);
    tavle.setAttribute("class", "btn btn-info btn-lg");
    tavle.setAttribute("data-toggle","modal");
    tavle.setAttribute("data-target","#myTavleModal");
    tavle.setAttribute("id", nyTavleInput.value + groupIndex + tavleIndex);
    tavle.setAttribute("onclick","changeTavle(this.id)");
    tavleList.appendChild(tavle);
    let arrayOfBoards = group[groupIndex].boards;
    tavle.innerHTML = arrayOfBoards[tavleIndex].name;
    nyTavleInput.value = "";
    }
}

function sendId(id){
    let hiddenHead = document.getElementById("hiddenModal");
    hiddenHead.innerHTML = id;
}

function removeTable(){
    let hiddenHead = document.getElementById("tavle-Head").innerHTML;
    let boardIndex = document.getElementById(hiddenHead);
    let groupIndexFinder = boardIndex.parentElement.id;
    let tr = document.getElementById(groupIndexFinder);
    let bIndex = boardIndex.getAttribute("numb");
    let groupFound = document.getElementById(tr.parentElement.id);
    let gIndex = groupFound.getAttribute("numb");
    group[gIndex].boards.splice(bIndex,1);
    board.splice(bIndex, 1);
    boardIndex.parentNode.removeChild(boardIndex);
    return false;
}

