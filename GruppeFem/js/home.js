alert(group.length);
function changeTavle(id){
    let modal = document.getElementById("link-Tavle");
    let tavleName = document.getElementById(id);
    modal.innerHTML = tavleName.innerHTML;
    let hiddenHead = document.getElementById("tavle-Head");
    hiddenHead.innerHTML = id;
}

function lagGruppe(){
    for(let i=0; i < group.length; i++){
        let gruppelist = document.createElement("table");
        let groupBody = document.getElementById("gruppe-Body");
        gruppelist.setAttribute("id","tavle"+i);
        gruppelist.setAttribute("numb",i);
        let addButton = document.createElement("button");
        addButton.setAttribute("class", "btn btn-info btn-sm");

        addButton.innerHTML = "Legg til tavle";
       // gruppelist.innerHTML = group.value;
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
        let gruppeliste = document.getElementById("tavle" + i);
        gruppeliste.appendChild(tavleList);
        /*
        var j = 0;
        function lagTavler(){
            for (j = 0; j < 3;j++){

                gruppelist.appendChild(tavleList);
                return j;

            }
        }*/
        function lagTavle(board) {
            let arrayOfTavler = group[i].boards;
            for(let k = 0; k < arrayOfTavler.length;k++){
                let tavle = document.createElement("td");
                let tavleList = document.getElementById("tr"+i);
                tavleList.appendChild(tavle);
                let nameOfTavle = group[i].boards[k].board+k;
                //alert(k);
                let num = k + 1;
                let bor = Object.keys(board);
                let arrayOfBoards = group[i].boards;
                let arrayOfTables = arrayOfBoards[k].name;
                tavle.innerHTML = arrayOfTables;
                tavle.setAttribute("class","btn btn-info btn-lg");
                tavle.setAttribute("data-toggle","modal");
                tavle.setAttribute("data-target","#myTavleModal");
                tavle.setAttribute("id","tavle"+i+k);
                tavle.setAttribute("onclick","changeTavle(this.id)");
                tavle.setAttribute("numb", k);
            }
        }


        lagTavle(board);



    }
}

/*
function lagTavler(){
    for(let j = 0; j < 4;j++){
        alert("j = "+j);
        let tavleList = document.createElement("table");
        let gruppelist = document.getElementById("table"+j);
        gruppelist.appendChild(tavleList);
        /*
        let arrayOfTavler = arrayOfGruppe[j].boards;
        for(let k = 0; k < group.group1.boards[k].lists.length; k++){
            alert("k = " + k);
        }*//*
    }
}
/*
function lagTavle(){
    for (let l = 0; l < 4;l++){
        alert("l = "+l);
        let tavle = document.createElement("tr");
        let tavleList = document.getElementById("table"+l);
        tavleList.appendChild(tavle);
    }
} */


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
    thisTavleOut.innerHTML = newName.value;
    newName.value = "";
}

function removeChangeInput(){
    let input = document.getElementById("change-Input");
    input.value = "";
}


function lagExtraTavle(){

    if(document.getElementById("bruker-Input").value == ""){
        alert("vennligst skriv inn et navn");
    } else {
    let hiddenHead = document.getElementById("hiddenModal").innerHTML;
    let thisValue = document.getElementById(hiddenHead);
    let groupIndex = thisValue.getAttribute("numb");
    let nyTavleInput = document.getElementById("bruker-Input");
    let tavleIndex = group[groupIndex].boards.length;
    let newtavle =
    {
        name:nyTavleInput.value,
        lists: [],
        member: [],
    };

    nyTavleInput.value = "";
    group[groupIndex].boards.push(newtavle);
    alert(group[groupIndex].boards.length);
    let tavle = document.createElement("td");
    let tavleList = document.getElementById("tr" + groupIndex);

    tavle.setAttribute("class", "btn btn-info btn-lg");
    tavle.setAttribute("data-toggle","modal");
    tavle.setAttribute("data-target","#myTavleModal");
    tavle.setAttribute("id", "tavle" + groupIndex + tavleIndex);
    tavle.setAttribute("onclick","changeTavle(this.id)");
    tavleList.appendChild(tavle);
    let arrayOfBoards = group[groupIndex].boards;
    alert(groupIndex);
    alert(tavleIndex);
    let arrayOfTables = arrayOfBoards[tavleIndex].name;
    tavle.innerHTML = arrayOfBoards[tavleIndex].name;
    }
}

function sendId(id){
    let hiddenHead = document.getElementById("hiddenModal");
    hiddenHead.innerHTML = id;
    alert(hiddenHead.innerHTML);
}

function removeTable(){
    let hiddenHead = document.getElementById("tavle-Head").innerHTML;
    let boardIndex = document.getElementById(hiddenHead);
    let groupIndexFinder = hiddenHead.slice(0,hiddenHead.length - 1);
    alert(hiddenHead);//tavle00
    alert(groupIndexFinder);//tavle0
    let bIndex = boardIndex.getAttribute("numb");
    alert(bIndex);//0
    let groupFound = document.getElementById(groupIndexFinder);
    let gIndex = groupFound.getAttribute("numb");
    alert(gIndex);//0
    group[gIndex].boards.splice(bIndex,1);
    alert(group[gIndex].boards.length);
    boardIndex.parentNode.removeChild(boardIndex);
    return false;

}
/*
lagTavler();
lagTavle();

//alert(group.group1.boards.length);
/*
function lagTavler(){

    for(let i = 0; i<)
}

lagGruppe()
function addGroup()
{
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
} */
