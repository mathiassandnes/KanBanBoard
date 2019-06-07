
//Funksjonen forandrer navnen på knappen som viser hvilken tavle man skal linkes til.
function changeBoard(id){
    if(askIsActive === true){
        resetAskUser()
    }
    let modal = document.getElementById("link-board");
    let boardName = document.getElementById(id);
    let inputField = document.getElementById("change-input");
    inputField.setAttribute("placeholder", boardName.innerHTML);
    modal.innerHTML = "Go to " + boardName.innerHTML.toLowerCase();
    modal.setAttribute("onclick","window.location.href='board.html'");
    let hiddenHead = document.getElementById("board-head");
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
    let groupBody = document.getElementById("group-body");
    groupBody.innerHTML ="";

    for(let i=0; i < group.length; i++){
        //Lager gruppenes område, gir riktige attributter og styler dem.
        let groupList = document.createElement("table");
        let groupName = document.createElement("div");
        let groupHeader = document.createElement("div");
        addModal(groupName,"new-group-modal");
        groupList.appendChild(groupHeader);
        groupHeader.appendChild(groupName);
        groupHeader.setAttribute("class", "row");
        groupList.setAttribute("id",group[i].name + i);
        groupList.setAttribute("numb",i);
        groupList.setAttribute("class","column");
        groupList.style.marginBottom = "45px";
        groupName.onclick = function(e) {groupModal(e.target)};
        groupName.style.fontSize = "xx-large";
        groupList.style.backgroundColor = "#C92047";
        groupList.style.borderRadius = "25px";
        groupHeader.style.marginRight = "25px";
        groupHeader.style.marginLeft= "20px";


        //Lager knappen for å legge til flere tavler.
        let addButton = createHtmlElementWithText("div","Legg til tavle");
        addButton.setAttribute("class", "btn btn-primary m-3 btn-sm");
        addButton.innerHTML = "Add new board";
        groupName.innerHTML = group[i].name;
        groupBody.appendChild(groupList);
        groupList.appendChild(addButton);
        addModal(addButton,"create-board-modal");
        groupHeader.appendChild(addButton);
        addButton.setAttribute("numb",i);
        addButton.setAttribute("id","button"+i);
        addButton.setAttribute("onclick","sendId(this.id)");

        groupList.className = "column";
        //Lager elementet som holder tavlene i gruppene.
        let boardList = document.createElement("div");
        boardList.setAttribute("id","tr"+i);
        boardList.setAttribute("numb", i);
        let gruppeliste = document.getElementById(group[i].name + i);
        gruppeliste.appendChild(boardList);
        // Funksjonen for å lage tavlene og for å gi den riktige attributter.
        function createBoard() {
            let arrayOfBoards = group[i].boards;
            for(let k = 0; k < arrayOfBoards.length;k++){
                //
                let arrayOfBoards = group[i].boards;
                let BoardsName = arrayOfBoards[k].name;
                let board = createHtmlElementWithText("div", BoardsName);
                let boardList = document.getElementById("tr"+i);
                boardList.appendChild(board);
                board.setAttribute("class","btn btn-dark m-3 onboard-text center");
                addModal(board,"board-info-modal");
                board.setAttribute("id", BoardsName + i + k);
                board.setAttribute("onclick","changeBoard(this.id)");
                board.setAttribute("numb", k);
            }
        }
        //Kjører funksjonen slik at riktig tavler blir lagt til i riktig grupper
        createBoard(board);
    }
}

//Kjører hele funksjonen for elementene på siden.
lagGruppe();

//Funksjonen for å lage nye tavler fra HTML siden.
function addExtraBoard(){
    let hiddenHead = document.getElementById("hidden-modal").innerHTML;
    let thisValue = document.getElementById(hiddenHead);
    let groupIndex = thisValue.getAttribute("numb");
    let sameName = false;
    let nyBoardInput = document.getElementById("user-input");
    //En loop som sjekker om navnet allerede eksisterer.
    for (let j = 0; j < group[groupIndex].boards.length; j++){
        if (group[groupIndex].boards[j].name === nyBoardInput.value){
            sameName = true;
        }
    }
    //Her sjekker man det er noe i input feltet, og så sjekker den om navnet eksisterte og så stopper funksjonen.
    if(nyBoardInput.value === ""){
        alert("Please write in a name.");
    } else if(sameName === true) {
        alert("This name is already in use in this group. Please choose something else.");
        nyBoardInput.value = "";
    } else {

        //Ny tavle objectet lages og legges til i riktige arrays.
        let boardIndex = group[groupIndex].boards.length;
        let newBoard =
            {
                name:nyBoardInput.value,
                lists: [],
                member: [],
            };
        group[groupIndex].boards.push(newBoard);
        board.push(newBoard);
        //HTML tavlen får riktige attributter
        let arrayOfBoards = group[groupIndex].boards;
        let boardHtml = createHtmlElementWithText("div", arrayOfBoards[boardIndex].name);
        let boardList = document.getElementById("tr" + groupIndex);
        addModal(boardHtml,"board-info-modal");
        boardHtml.setAttribute("class", "btn onboard-text m-3 center btn-dark");
        boardHtml.setAttribute("id", nyBoardInput.value + groupIndex + boardIndex);
        boardHtml.setAttribute("onclick","changeBoard(this.id)");
        boardList.appendChild(boardHtml);
        removeInput()
    }
}


// Funksjonen for å forandre navnet til tavler både elementet i HTML og navnet i arrayet.
function renameBoard() {
    let thisBoard = document.getElementById("board-head");
    let hiddenID = thisBoard.innerHTML;
    let newName = document.getElementById("change-input");
    let thisBoardOut = document.getElementById(hiddenID);
    let trTag = thisBoardOut.parentElement;
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
        alert("Please write in a name");
        newName.value = "";
    }else if(nameExists === true) {
        alert("This name is already in use in this group. Please choose something else.");
    } else {
        for(let o = 0; o <group[groupIndex].boards.length; o++){
                var thisIndex = o;
                let arrayOfBoards = group[groupIndex].boards;
                arrayOfBoards[thisIndex].name = newName.value;
                thisBoardOut.innerHTML = newName.value;
        }
        let arrayOfBoards = group[groupIndex].boards;
        arrayOfBoards[thisIndex].name = newName.value;
        thisBoardOut.innerHTML = newName.value;
    }
    thisBoardOut.setAttribute("id", newName.value + groupIndex +thisIndex);
    newName.value = "";
}

// Fjerner tekst fra input i tavle info modalen når man lukker modalen.
function removeChangeInput(){
    let input = document.getElementById("change-input");
    input.value = "";
}

// Fjerner tekst fra input i lag ny tavle modalen når man lukker modalen.
function removeInput(){
    let input = document.getElementById("user-input");
    input.value = "";
}

//Funksjon som finner input felt og gjør at det aksepterer input når man trykker på enter.
function giveOnEnterPress(input,funcButton) {
    let cardInputField = document.getElementById(input);
    cardInputField.addEventListener("keyup",function (event) {
        if(event.key === "Enter"){
            document.getElementById(funcButton).click();
        }
    });
}
//Gjør at alle modaler aksepterer input når man trykker enter
giveOnEnterPress("group-name-group-modal","create-new-group");
giveOnEnterPress("user-input","accept-board-input");
giveOnEnterPress("change-input","accept-input");

//Funksjon for å sende id inn til modal slik at man lett kan finne knappen man trykket på.
function sendId(id){
    let hiddenHead = document.getElementById("hidden-modal");
    hiddenHead.innerHTML = id;
}

//Forandrer modal og spør bruker om bruker er sikkere på om de vil slette tavlen.
var askIsActive = false;
function askUserRemove() {
    //Viser at modal er forandret.
    askIsActive = true;
    let acceptButton = document.getElementById("accept-input");
    let closeButton = document.getElementById("close-modal-button");
    //Finner elementer og skjuler dem
    document.getElementById("delete-board").setAttribute("hidden",true);
    document.getElementById("link-board").setAttribute("hidden",true);
    document.getElementById("change-input").setAttribute("hidden",true);
    //Lager en div i modal for tekst.
    let modalBody = document.getElementById("board-info-modal-body");
    let textBody = document.createElement("div");
    //Gir textBody id slik at den kan bli funnet enkelt
    textBody.setAttribute("id","get-this-body");
    //Gir styling til alle gjenverende elementer i modalen.
    textBody.style.color = "black";
    modalBody.appendChild(textBody);
    textBody.innerHTML = "Are you sure you want to delete this board?";

    closeButton.innerHTML = "No, i don't want to delete this board.";
    closeButton.setAttribute("class","btn btn-primary");
    closeButton.setAttribute("onclick","resetAskUser()");
    acceptButton.innerHTML = "Yes, delete board";
    acceptButton.setAttribute("onclick","removeBoard()");
}

//Reseter det som askUserRemove gjorde med modalen.
function resetAskUser() {
    let acceptButton = document.getElementById("accept-input");
    let closeButton = document.getElementById("close-modal-button");

    document.getElementById("delete-board").removeAttribute("hidden");
    document.getElementById("link-board").removeAttribute("hidden");
    document.getElementById("change-input").removeAttribute("hidden");

    let textBody = document.getElementById("get-this-body");
    textBody.parentNode.removeChild(textBody);

    closeButton.innerHTML = "Close";
    closeButton.setAttribute("class","btn btn-default");
    closeButton.setAttribute("onclick","removeChangeInput()");
    acceptButton.innerHTML = "Save changes";
    acceptButton.setAttribute("onclick","renameBoard()");
    askIsActive = false;
}

//Funksjon for å fjerne en tavle fra arrayet det lå i og fra HTML siden.
function removeBoard(){
    let hiddenHead = document.getElementById("board-head").innerHTML;
    let boardIndex = document.getElementById(hiddenHead);
    let groupIndexFinder = boardIndex.parentElement.id;
    let tr = document.getElementById(groupIndexFinder);
    //Bruker numb for å finne riktig index på tavlen, både tavlens index og gruppen den ligger i sin index.
    let bIndex = boardIndex.getAttribute("numb");
    let groupFound = document.getElementById(tr.parentElement.id);
    let gIndex = groupFound.getAttribute("numb");
    //Fjernes fra begge arrays tavlen ligger i.
    group[gIndex].boards.splice(bIndex,1);
    board.splice(bIndex, 1);
    //Fjerner HTML elementet.
    boardIndex.parentNode.removeChild(boardIndex);
    //Her brukes jquery for å lukke modalen gjennom funksjonen.
    $("#board-info-modal").modal("toggle");
    resetAskUser();
}