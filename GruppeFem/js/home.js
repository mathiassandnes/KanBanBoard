//Funksjonen forandrer navnen på knappen som viser hvilken tavle man skal linkes til.
function changeTavle(id){
    let modal = document.getElementById("link-Tavle");
    let tavleName = document.getElementById(id);
    modal.innerHTML = "Gå til " + tavleName.innerHTML;
    modal.setAttribute("onclick","window.location.href='board.html'");
    let hiddenHead = document.getElementById("tavle-Head");
    hiddenHead.innerHTML = id;
}

//Lager Gruppe elementer og gir dem attributter.
function lagGruppe(){
    for(let i=0; i < group.length; i++){
        let gruppelist = document.createElement("table");
        let groupBody = document.getElementById("gruppe-Body");
        gruppelist.setAttribute("id",group[i].name + i);
        gruppelist.setAttribute("numb",i);
        //Lager knappen for å legge til flere tavler.
        let addButton = document.createElement("button");
        addButton.setAttribute("class", "btn btn-primary btn-sm");
        addButton.innerHTML = "Legg til tavle";
        gruppelist.innerHTML = "<legend>"+group[i].name+"</legend>";
        groupBody.appendChild(gruppelist);
        gruppelist.appendChild(addButton);
        addButton.setAttribute("data-toggle","modal");
        addButton.setAttribute("data-target","#myModal");
        addButton.setAttribute("numb",i);
        addButton.setAttribute("id","button"+i);
        addButton.setAttribute("onclick","sendId(this.id)");
        gruppelist.setAttribute("class","column");
        //Lager elementet som holder tavlene i gruppene.
        let tavleList = document.createElement("tr");
        tavleList.setAttribute("id","tr"+i);
        tavleList.setAttribute("numb", i);
        let gruppeliste = document.getElementById(group[i].name + i);
        gruppeliste.appendChild(tavleList);
        // Funksjonen for å lage tavlene og for å gi den riktige attributter.
        function lagTavle() {
            let arrayOfTavler = group[i].boards;
            for(let k = 0; k < arrayOfTavler.length;k++){
                let tavle = document.createElement("div");
                let tavleList = document.getElementById("tr"+i);
                tavleList.appendChild(tavle);
                let arrayOfBoards = group[i].boards;
                let arrayOfTables = arrayOfBoards[k].name;
                tavle.innerHTML = arrayOfTables;
                tavle.setAttribute("class","btn btn-dark m-3 onboard-text center");
                tavle.setAttribute("data-toggle","modal");
                tavle.setAttribute("data-target","#tavle-Info-Modal");
                tavle.setAttribute("id",arrayOfTables + i + k);
                tavle.setAttribute("onclick","changeTavle(this.id)");
                tavle.setAttribute("numb", k);
            }
        }
        //Kjører funksjonen slik at riktig tavler blir lagt til i riktig grupper
        lagTavle(board);
    }
}

//Kjører hele funksjonen for elementene på siden.
lagGruppe();

// Fjerner tekst fra input når man lukker modal
function removeInput(){
    let input = document.getElementById("bruker-Input");
    input.value = "";
}

// Funksjonen for å forandre navnet til tavler både elementet i HTML og navnet i arrayet.
function renameTavle() {
    let thisTavle = document.getElementById("tavle-Head");
    let hiddenID = thisTavle.innerHTML;
    let newName = document.getElementById("change-Input");
    let thisTavleOut = document.getElementById(hiddenID);
    let trTag = thisTavleOut.parentElement;
    let groupIndex = trTag.getAttribute("numb");
    let arrayOfGroup = group[groupIndex];
    let nameExists = false;
    //Her sjekkes det både om navnet allerede eksistere og om det ikke er noe i input feltet.
    for(let l = 0; l <group[groupIndex].boards.length;l++) {
        if (newName.value === "") {
            alert("Vennligst oppgi nytt navn.");
            newName.value = "";
        } else if (newName.value === arrayOfGroup.boards[l].name) {
            nameExists = true;

        }
    }
    //Hvis navnet eksisterer stopper funksjonen, hvis ikke så forandres navnet både HTML elementet og objectet i arrayet.
    if(nameExists === true) {
        alert("Det er allerede en tavle med dette navnet. Vennligst velg et annet navn.");
    } else {
        for(let o = 0; o <group[groupIndex].boards.length; o++){
            if(thisTavleOut.innerHTML === group[groupIndex].boards[o].name){
                var thisIndex = o;
            }  else{

            }
        }
        let arrayOfBoards = group[groupIndex].boards;
        arrayOfBoards[thisIndex].name = newName.value;
        thisTavleOut.innerHTML = newName.value;
    }
    thisTavleOut.setAttribute("id", newName.value + groupIndex +thisIndex);
    newName.value = "";
}

// Fjerner tekst fra input når man lukker modal
function removeChangeInput(){
    let input = document.getElementById("change-Input");
    input.value = "";
}

//Funksjonen for å lage nye tavler fra HTML siden.
function lagExtraTavle(){
    let hiddenHead = document.getElementById("hiddenModal").innerHTML;
    let thisValue = document.getElementById(hiddenHead);
    let groupIndex = thisValue.getAttribute("numb");
    let sameName = false;
    let nyTavleInput = document.getElementById("bruker-Input");
    //En loop som sjekker om navnet allerede eksisterer.
    for (let j = 0; j < group[groupIndex].boards.length; j++){
        if (group[groupIndex].boards[j].name === nyTavleInput.value){
            sameName = true;
        }
    }
    //Her sjekker man det er noe i input feltet, og så sjekker den om navnet eksisterte og så stopper funksjonen.
    if(nyTavleInput.value === ""){
        alert("Vennligst skriv inn et navn");
    } else if(sameName === true) {
        alert("Dette navnet blir allerede brukt i denne gruppen. Vennligst skriv inn et annet navn.");
        nyTavleInput.value = "";
    } else {

    //Ny tavle objectet lages og legges til i riktige arrays.
    let tavleIndex = group[groupIndex].boards.length;
    let newtavle =
    {
        name:nyTavleInput.value,
        lists: [],
        member: [],
    };
    group[groupIndex].boards.push(newtavle);
    board.push(newtavle);
    //HTML tavlen får riktige attributter
    let tavle = document.createElement("div");
    let tavleList = document.getElementById("tr" + groupIndex);
    tavle.setAttribute("class", "btn onboard-text m-3 center btn-dark");
    tavle.setAttribute("data-toggle","modal");
    tavle.setAttribute("data-target","#tavle-Info-Modal");
    tavle.setAttribute("id", nyTavleInput.value + groupIndex + tavleIndex);
    tavle.setAttribute("onclick","changeTavle(this.id)");
    tavleList.appendChild(tavle);
    let arrayOfBoards = group[groupIndex].boards;
    tavle.innerHTML = arrayOfBoards[tavleIndex].name;
    nyTavleInput.value = "";
    }
}

//Funksjon for å sende id inn til modal slik at man lett kan finne knappen man trykket på.
function sendId(id){
    let hiddenHead = document.getElementById("hiddenModal");
    hiddenHead.innerHTML = id;
}

//Forandrer modal og spør bruker om de er sikkere på om de vil slette tavlen.
function askUserRemove() {
    let hiddenHead = document.getElementById("tavle-Head").innerHTML;
    let godtaButton = document.getElementById("accept-Input");
    let closeButton = document.getElementById("close-Modal-Button");
    let slettButton = document.getElementById("delete-Tavle");
    let linkButton = document.getElementById("link-Tavle");
    let inputField = document.getElementById("change-Input");
    let modalBody = document.getElementById("tavle-Info-Modal-Body");
    let textBody = document.createElement("div");
    textBody.setAttribute("id","getThisBody");
    modalBody.appendChild(textBody);
    textBody.innerHTML = "Er du sikker på at du vil slette tavlen?";
    closeButton.innerHTML = "Nei, jeg vil ikke slette.";
    closeButton.setAttribute("class","btn btn-primary");
    closeButton.setAttribute("onclick","resetAskUser()");
    godtaButton.innerHTML = "Ja, Slett tavlen";
    godtaButton.setAttribute("onclick","removeTable()");
    slettButton.setAttribute("hidden",true);
    linkButton.setAttribute("hidden",true);
    inputField.setAttribute("hidden",true);
}

//Reseter det som askUserRemove gjorde med modalen.
function resetAskUser() {
    let godtaButton = document.getElementById("accept-Input");
    let closeButton = document.getElementById("close-Modal-Button");
    let slettButton = document.getElementById("delete-Tavle");
    let linkButton = document.getElementById("link-Tavle");
    let inputField = document.getElementById("change-Input");
    let modalBody = document.getElementById("tavle-Info-Modal-Body");
    let textBody = document.getElementById("getThisBody");
    textBody.parentNode.removeChild(textBody);
    closeButton.innerHTML = "Close";
    closeButton.setAttribute("class","btn btn-default");
    godtaButton.innerHTML = "Godta";
    closeButton.setAttribute("onclick","");
    godtaButton.setAttribute("onclick","");
    slettButton.removeAttribute("hidden");
    linkButton.removeAttribute("hidden");
    inputField.removeAttribute("hidden");
}

//Funksjon for å fjerne en tavle fra arrayet det lå i og fra HTML siden.
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
    resetAskUser();
    return false;
}

