//Funksjonen forandrer navnen på knappen som viser hvilken tavle man skal linkes til.
function changeTavle(id){
    if(askIsActive === true){
        resetAskUser()
    }
    let modal = document.getElementById("link-Tavle");
    let tavleName = document.getElementById(id);
    let inputFelt = document.getElementById("change-Input");
    inputFelt.setAttribute("placeholder", tavleName.innerHTML);
    modal.innerHTML = "Go to " + tavleName.innerHTML.toLowerCase();
    modal.setAttribute("onclick","window.location.href='board.html'");
    let hiddenHead = document.getElementById("tavle-Head");
    hiddenHead.innerHTML = id;

}
//gjør det enklere å lage et html elemenet med tekst
function createHtmlElementWithText(tagName, text){
    let element = document.createElement(tagName);
    element.innerHTML = text;
    return element;
}

//kobler til en modal med setAttribute
function addModal(element, modalName){
    element.setAttribute('data-toggle', 'modal');
    element.setAttribute('data-target', '#'+modalName);
}

//Lager Gruppe elementer og gir dem attributter.
function lagGruppe(){
    let groupBody = document.getElementById("group-Body");
    groupBody.innerHTML ="";

    for(let i=0; i < group.length; i++){

        let gruppelist = document.createElement("table");
        let groupName = document.createElement("div");
        let groupHeader = document.createElement("div");
        addModal(groupName,"new-group-modal");
        gruppelist.appendChild(groupHeader);
        groupHeader.appendChild(groupName);
        groupHeader.setAttribute("class", "row");
        gruppelist.setAttribute("id",group[i].name + i);
        gruppelist.setAttribute("numb",i);
        gruppelist.setAttribute("class","column");
        gruppelist.style.marginBottom = "45px";
        groupName.onclick = function(e) {groupModal(e.target)};
        groupName.style.fontSize = "xx-large";
        gruppelist.style.backgroundColor = "#C92047";
        gruppelist.style.borderRadius = "25px";
        groupHeader.style.marginRight = "25px";
        groupHeader.style.marginLeft= "20px";


        //Lager knappen for å legge til flere tavler.
        let addButton = createHtmlElementWithText("div","Legg til tavle");
        addButton.setAttribute("class", "btn btn-primary m-3 btn-sm");
        //gruppelist.innerHTML = "<legend>"+group[i].name+"</legend>";
        addButton.innerHTML = "Add new board";
        groupName.innerHTML = group[i].name;
        groupBody.appendChild(gruppelist);
        groupHeader.appendChild(addButton);
        addModal(addButton,"lag-Tavle-Modal");
        addButton.setAttribute("numb",i);
        addButton.setAttribute("id","button"+i);
        addButton.setAttribute("onclick","sendId(this.id)");

        gruppelist.className = "column";
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
                let arrayOfBoards = group[i].boards;
                let arrayOfTables = arrayOfBoards[k].name;
                let tavle = createHtmlElementWithText("button", arrayOfTables);
                let tavleList = document.getElementById("tr"+i);
                tavleList.appendChild(tavle);
                tavle.setAttribute("class","btn btn-dark m-3 onboard-text center");
                addModal(tavle,"tavle-Info-Modal");
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

//Funksjonen for å lage nye tavler fra HTML siden.
function lagExtraTavle(){
    alert("dsasa");
    let hiddenHead = document.getElementById("hiddenModal").innerHTML;
    let thisValue = document.getElementById(hiddenHead);
    let groupIndex = thisValue.getAttribute("numb");
    let sameName = false;
    let nyTavleInput = document.getElementById("bruker-Input");
    alert(nyTavleInput);
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
        let arrayOfBoards = group[groupIndex].boards;
        let tavle = createHtmlElementWithText("div", arrayOfBoards[tavleIndex].name);
        let tavleList = document.getElementById("tr" + groupIndex);
        addModal(tavle,"tavle-Info-Modal");
        tavle.setAttribute("class", "btn onboard-text m-3 center btn-dark");
        tavle.setAttribute("id", nyTavleInput.value + groupIndex + tavleIndex);
        tavle.setAttribute("onclick","changeTavle(this.id)");
        tavleList.appendChild(tavle);
        nyTavleInput.value = "";
    }
}

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
        if (newName.value === arrayOfGroup.boards[l].name) {
            nameExists = true;
        }
    }
    //Hvis navnet eksisterer stopper funksjonen, hvis ikke så forandres navnet både HTML elementet og objectet i arrayet.
    if (newName.value === "") {
        alert("Vennligst oppgi nytt navn.");
        newName.value = "";
    }else if(nameExists === true) {
        alert("Det er allerede en tavle med dette navnet. Vennligst velg et annet navn.");
    } else {
        for(let o = 0; o <group[groupIndex].boards.length; o++){
                var thisIndex = o;
                let arrayOfBoards = group[groupIndex].boards;
                arrayOfBoards[thisIndex].name = newName.value;
                thisTavleOut.innerHTML = newName.value;
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

//Forandrer modal og spør bruker om bruker er sikkere på om de vil slette tavlen.
var askIsActive = false;
function askUserRemove() {
    askIsActive = true;
    let godtaButton = document.getElementById("accept-Input");
    let closeButton = document.getElementById("close-Modal-Button");
    let slettButton = document.getElementById("delete-Tavle");
    let linkButton = document.getElementById("link-Tavle");
    let inputField = document.getElementById("change-Input");
    let modalBody = document.getElementById("tavle-Info-Modal-Body");
    let textBody = document.createElement("div");
    textBody.setAttribute("id","getThisBody");
    textBody.style.color = "black";
    modalBody.appendChild(textBody);
    textBody.innerHTML = "Are you sure you want to delete this board?";
    closeButton.innerHTML = "No, i don't want to delete this board.";
    closeButton.setAttribute("class","btn btn-primary");
    closeButton.setAttribute("onclick","resetAskUser()");
    linkButton.innerHTML = "Yes, delete board";
    linkButton.setAttribute("onclick","removeTable()");
    slettButton.setAttribute("hidden",true);
    godtaButton.setAttribute("hidden",true);
    inputField.setAttribute("hidden",true);
}

//Reseter det som askUserRemove gjorde med modalen.
function resetAskUser() {
    let godtaButton = document.getElementById("accept-Input");
    let closeButton = document.getElementById("close-Modal-Button");
    let slettButton = document.getElementById("delete-Tavle");
    let linkButton = document.getElementById("link-Tavle");
    let inputField = document.getElementById("change-Input");
    let textBody = document.getElementById("getThisBody");
    textBody.parentNode.removeChild(textBody);
    closeButton.innerHTML = "Close";
    closeButton.setAttribute("class","btn btn-default");
    linkButton.innerHTML = "Change name";
    closeButton.setAttribute("onclick","removeChangeInput()");
    linkButton.setAttribute("onclick","renameTavle()");
    slettButton.removeAttribute("hidden");
    godtaButton.removeAttribute("hidden");
    inputField.removeAttribute("hidden");
    askIsActive = false;
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
    $("#tavle-Info-Modal").modal("toggle");
    resetAskUser();
    return false;
}

