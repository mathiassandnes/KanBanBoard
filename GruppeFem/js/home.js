
function leggTilTavle(){
    var row = document.getElementById("Group");
    var x = row.insertCell(-1);
    var y = document.getElementsByTagName("td").length;
    x.innerHTML = "tavle  " + y;
    x.onClick = addGroup();
}

let arrayOfGruppe = Object.keys(group);
alert(group.length);

function changeTavle(id){
    let modal = document.getElementById("link-Tavle");
    let tavleName = document.getElementById(id);
    modal.innerHTML = tavleName.innerHTML;
    let hiddenHead = document.getElementById("tavle-Head");
    hiddenHead.innerHTML = id;
}

function lagGruppe(){
    for(let i=0; i < arrayOfGruppe.length; i++){
        let gruppelist = document.createElement("table");
        let groupBody = document.getElementById("gruppe-Body");
        gruppelist.setAttribute("id","table"+i);
        let addButton = document.createElement("button");
        addButton.setAttribute("class", "btn btn-info btn-sm");
        addButton.innerHTML = "Legg til tavle";
       // gruppelist.innerHTML = group.value;
        gruppelist.innerHTML = group[i].name;
        groupBody.appendChild(gruppelist);
        gruppelist.appendChild(addButton);
        addButton.setAttribute("data-toggle","modal");
        addButton.setAttribute("data-target","#myModal");

        gruppelist.setAttribute("class","column");
        let tavleList = document.createElement("tr");
        tavleList.setAttribute("id","tr"+i);
        let gruppeliste = document.getElementById("table" + i);
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
                tavle.innerHTML = "tavle" + k;
                tavle.setAttribute("class","btn btn-info btn-lg");
                tavle.setAttribute("data-toggle","modal");
                tavle.setAttribute("data-target","#myTavleModal");
                tavle.setAttribute("id","tavle"+i+k);
                tavle.setAttribute("onclick","changeTavle(this.id)");
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
    let input = document.getElementById("bruker-Input")
    input.value = "";
}

function renameTavle() {
    let thisTavle = document.getElementById("tavle-Head");
    let hiddenID = thisTavle.innerHTML
    let newName = document.getElementById("change-Input");
    let thisTavleOut = document.getElementById(hiddenID);
    thisTavleOut.innerHTML = newName.value;
}

function removeChangeInput(){
    let input = document.getElementById("change-Input");
    input.value = "";
}


function lagExtraTavle(){
    let thisGroup = document.getElementById();
    let list = document.getElementById();
    let newTavle = document.createElement("tr")
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
