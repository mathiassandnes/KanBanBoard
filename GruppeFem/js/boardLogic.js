
//tegner tabs
function drawBoards() {
    for (let i = 0; i < arrayOfBoards.length; i++) {
        let newTabButtonElement = createHtmlElementWithText('button', arrayOfBoards[i].name);
        newTabButtonElement.setAttribute("onclick", "drawTables("+i+")");
        newTabButtonElement.className="btn rounded m-1";
        newTabButtonElement.style="background-color: #E72552; color: #FFF1D4;";
        document.getElementById('nav').appendChild(newTabButtonElement);
    }
}


//all funksjonalitet som ligger i modalen på lister
function listModal(target, board){
    let listNameInModal = document.getElementById('list-name-list-modal');
    let isNewList = true;
    let currentList;

    //ser om listen eksisterer
    for(let i = 0; i < list.length; i++){
        if(list[i].name === target.innerHTML){
            currentList = list[i];
            listNameInModal.value = currentList.name;
            isNewList = false;
        }
    }

    //om det ikke eksisterer må vi resette modalen
    if(isNewList){listNameInModal.value = "";}

    //onclick på save button i modal
    document.getElementById('create-new-list').onclick = function(){

        // om listen er ny må vi lage et nytt objekt som vi legger inn i databasen
        if(isNewList){
            currentList = {
                name: listNameInModal.value,
                cards: []
            };

            //listen må tegnes
            drawList(currentList);

            board.lists.push(currentList);
            list.push(currentList);
        }else{
            // hvis vi har gjort endringer må de oppdateres
            currentList.name = listNameInModal.value;
            target.innerHTML = listNameInModal.value;
        }
    }
}

//all funksjonalitet som ligger i modalen på kort
function cardModal(e, container, listToDraw) {

    //dette må resettes hver gang for å unngå duplikat
    document.getElementById("responsible-user").innerHTML = "";

    //denne koden laster inn brukere i gruppa, og setter default responsible user til "not assigned"
    let defaultResponsibleUser = createHtmlElementWithText('option', 'Not assigned');
    defaultResponsibleUser.setAttribute('selected', 'selected');
    document.getElementById('responsible-user').appendChild(defaultResponsibleUser);
    for(let i = 0; i < group[0].members.length; i++){
        document.getElementById('responsible-user').appendChild(createHtmlElementWithText('option', group[0].members[i]));
    }

    let cardNameInModal = document.getElementById('card-name-input');
    let cardDescriptionInModal = document.getElementById('card-description');
    let priorityInModal = document.getElementById('priority');
    let responsibleUserInModal = document.getElementById('responsible-user');
    let isNewCard = true; // tar utgangspunkt i at det er et nytt kort
    let currentCard;

    // finner riktig kort i backend og tegner modalen med dets verider
    for (let x = 0; x < card.length; x++) {
        if (e.target.innerHTML === card[x].name) {

            currentCard = card[x];

            cardNameInModal.value = currentCard.name;
            cardDescriptionInModal.value = currentCard.description;
            priorityInModal.options.selectedIndex = currentCard.priority;
            responsibleUserInModal.options.selectedIndex = currentCard.responsibleUser;

            //om vi har funnet kortet, er det ikke nytt
            isNewCard = false;
        }
    }

    //resetter modalen hvis kortet er nytt
    if (isNewCard) {
        cardNameInModal.value = "";
        cardDescriptionInModal.value = "";
        document.getElementById('priority').options.selectedIndex = 0;
        responsibleUserInModal.options.selectedIndex = 0;
    }

    document.getElementById('save-card-changes').onclick = function () {

        //om kortet er nytt må det lages ett nytt objekt som lagres i databasen
        if (isNewCard) {
            currentCard = {
                name: cardNameInModal.value,
                description: cardDescriptionInModal.value,
                priority: priorityInModal.options.selectedIndex,
                responsibleUserInModal: responsibleUserInModal.options.selectedIndex
            };

            //det nye kortet må tegnes
            drawCard(currentCard.name, container);

            listToDraw.cards.push(currentCard);
            card.push(currentCard);
        }

        // changes name if updated
        if (cardNameInModal.value != currentCard.name) {
            e.target.innerHTML = cardNameInModal.value;
            currentCard.name = cardNameInModal.value;
        }
        // changes description if updated
        if (cardDescriptionInModal.value != currentCard.description) {
            currentCard.description = cardDescriptionInModal.value;
        }
        // changes priority if updated
        if (priorityInModal.options.selectedIndex != currentCard.priority) {
            currentCard.priority = priorityInModal.options.selectedIndex;
        }
        if (responsibleUserInModal.options.selectedIndex != currentCard.responsibleUser) {
            currentCard.responsibleUser = responsibleUserInModal.options.selectedIndex;
        }

    };


}

// Brukes til å tegne én liste og gi den alle properties
function drawList(listToDraw) {
    let listElementContainer = document.createElement('li');
    let listElementBody = document.createElement('ul');
    let listElement = createHtmlElementWithText('div', listToDraw.name);

    listElementContainer.className = "m-3 list-element p-1 col-1";
    listElementBody.className = "rounded-bottom bg-dark";
    listElementBody.style.minHeight=" 10px";
    listElement.style.minHeight=" 52px";
    listElement.className = "col-12 text-12 rounded-top bg-dark onboard-text text-center m-0 p-2";

    listElementContainer.id = listToDraw.name+"container";
    listElementBody.id = listToDraw.name+"body";
    listElement.id = listToDraw.name;

    addModal(listElement, 'list-modal');
    listElement.onclick = function(e){
        listModal(e.target, arrayOfBoards);
    };

    //legger listen inni liste området
    listElementContainer.appendChild(listElement);
    listElementContainer.appendChild(listElementBody);
    document.getElementById('lists-area').appendChild(listElementContainer);

    //legger til navnet til listen i en dropdown meny på kort modal

    //hvis du trykker på et element, skal vi åpne kort modalen
    listElementContainer.onclick = function (e) {
        cardModal(e, listElementBody, listToDraw);

    };


    let newCardButton = createHtmlElementWithText('button', '+ new task');

    addModal(newCardButton, 'card-modal');

    newCardButton.className = "center m-2 btn btn-primary col-11 new-card-button";
    listElementContainer.appendChild(newCardButton);

    activateDragAndDrop();
}

//tegner et enkelt kort
function drawCard(name, container){
    let cardElementContainer = document.createElement('li');
    let cardElement = createHtmlElementWithText('div', name);
    //legger kortet inn i listen
    cardElementContainer.appendChild(cardElement);
    container.appendChild(cardElementContainer);

    //classes for cards
    cardElementContainer.className="center col-12";
    cardElement.className="btn bg-light text-dark mt-1 mb-1 center col-12";

    //adds modal
    addModal(cardElement, 'card-modal');

    //give unique ID
    cardElement.id = name;
}

//tegner hele siden
function drawTables(board) {

    let arrayOfLists = arrayOfBoards[board].lists;

    // clears the screen
    let contentArea = document.getElementById('content-area');
    contentArea.innerHTML = "";

    //henter ut en html elementet som listene skal være inni
    let listsArea = document.createElement('ul');
    contentArea.appendChild(listsArea);
    listsArea.id = 'lists-area';
    listsArea.className = 'row col-12 m-1 container onboard-background';

    //looper igjennom listen med lister og tegner de
    for (let i = 0; i < arrayOfLists.length; i++) {
        let arrayOfCards = arrayOfLists[i].cards;
        drawList(arrayOfLists[i]);

        //let listElementContainer = document.getElementById(arrayOfLists[i].name+"container")
        let listElementBody = document.getElementById(arrayOfLists[i].name+"body")

        //looper igjennom listen med kort og tenger de
        for (let j = 0; j < arrayOfCards.length; j++) {
            drawCard(arrayOfCards[j].name, listElementBody)
        }
    }

    //knapp for å lage en ny liste
    let newListButton = createHtmlElementWithText('button', '+ new list');
    newListButton.id = "new-list";
    newListButton.className = "col-1 btn bg-light m-5";
    addModal(newListButton, 'list-modal');
    newListButton.onclick = function(e){listModal(e.target, arrayOfBoards[board]);};

    document.getElementById('content-area').appendChild(newListButton);
    //removed this for prototype because of bugs
}

giveOnEnterPress("card-name-input","save-card-changes");
giveOnEnterPress("list-name-list-modal","create-new-list");

let arrayOfBoards = group[0].boards; // 0 reoresnterer tavlen vi er på, om vi skulle hatt en state ville det bli brukt en variabel der for å velge tavle

drawBoards();
drawTables(0); //input må være det boardet vi trykket på i "home" siden