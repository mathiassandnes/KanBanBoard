/**
 * Genererer tabs
 */
//her lagres alle elementer på siden

var arrayOfBoards = group[0].boards;


function drawBoards() {
    for (let i = 0; i < arrayOfBoards.length; i++) {
        let newTabButtonElement = createHtmlElementWithText('button', arrayOfBoards[i].name);
        newTabButtonElement.setAttribute("onclick", "drawTables("+i+")");
        newTabButtonElement.className="btn rounded m-1"
        newTabButtonElement.style="background-color: #E72552; color: #FFF1D4;"
        document.getElementById('nav').appendChild(newTabButtonElement);
    }
}

function createHtmlElementWithText(tagName, text){
    let element = document.createElement(tagName);
    element.innerHTML = text;
    return element;
}

function addModal(element, modalName){
    element.setAttribute('data-toggle', 'modal');
    element.setAttribute('data-target', '#'+modalName);
}

function drawCard(name, container){
    let cardElementContainer = document.createElement('li');
    let cardElement = createHtmlElementWithText('div', name);
    //legger kortet inn i listen
    cardElementContainer.appendChild(cardElement);
    container.appendChild(cardElementContainer);

    //classes for cards
    cardElementContainer.className="center col-12";
    cardElement.className="btn bg-light text-dark m-1 center col-12";

    //adds modal
    addModal(cardElement, 'card-modal')

    //give unique ID
    cardElement.id = name;
}

function listModal(target, i){
    let listNameInModal = document.getElementById('list-name-list-modal');
    let isNewList = true;
    let currentList;
    for(let i = 0; i < list.length; i++){
        if(list[i].name === target.innerHTML){
            currentList = list[i] ;

            listNameInModal.value = currentList.name;

            isNewList = false;
        }
    }
    if(isNewList){
        listNameInModal.value = "";
    }

    document.getElementById('create-new-list').onclick = function(){
        if(isNewList){
            currentList = {
                name: listNameInModal.value,
                cards: []
            }
            drawList(currentList, i)
        }
    }

}

function drawList(list, i) {
    let listElementContainer = document.createElement('li');
    let listElementBody = document.createElement('ul');
    let listElement = createHtmlElementWithText('div', list.name); // få dette større <legend>


    listElementContainer.className = "m-3 bg-dark rounded list-element p-1 col-1";
    listElementBody.className = "bg-info";
    listElement.className = "col-12 text-12 onboard-text text-center m-1 p-2";

    listElementContainer.id = list.name+"container";
    listElementBody.id = list.name+"body";
    listElement.id = list.name;

    addModal(listElement, 'list-modal');
    listElement.onclick = function(e){
        listModal(e.target, i);
    }


    //legger listen inni liste området
    listElementContainer.appendChild(listElement);
    listElementContainer.appendChild(listElementBody);
    document.getElementById('lists-area').appendChild(listElementContainer);


    //legger til navnet til listen i en dropdown meny på kort modal
    document.getElementById('list-name').appendChild(createHtmlElementWithText('option', list.name));

    listElementContainer.onclick = function (e) {
        let cardNameInModal = document.getElementById('card-name-input');
        let cardDescriptionInModal = document.getElementById('card-description');
        let priorityInModal = document.getElementById('priority');
        let listNameInModal = document.getElementById('list-name');
        var isNewCard = true;
        var currentCard;

        // finds the correct card in backend and draws the modal with its values
        for (let x = 0; x < card.length; x++) {
            if (e.target.innerHTML === card[x].name) {

                currentCard = card[x];

                cardNameInModal.value = currentCard.name;
                cardDescriptionInModal.value = currentCard.description;
                priorityInModal.options.selectedIndex = currentCard.priority;
                listNameInModal.options.selectedIndex = i;// her må vi finne på noe bedre
                isNewCard = false;
            }
        }
        if (isNewCard) {
            cardNameInModal.value = "";
            cardDescriptionInModal.value = "";
            document.getElementById('priority').options.selectedIndex = 0;
        }


        document.getElementById('save-card-changes').onclick = function () {

            if (isNewCard) {
                currentCard = {
                    name: cardNameInModal.value,
                    description: cardDescriptionInModal.value,
                    priority: priorityInModal.options.selectedIndex
                };
                drawCard(currentCard.name, listElementBody);

                list.cards.push(currentCard);
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


        };
    };

    let newCardButton = createHtmlElementWithText('button', 'New card');

    addModal(newCardButton, 'card-modal');

    newCardButton.className = "center btn btn-primary col-12 new-card-button";
    listElementContainer.appendChild(newCardButton);

}

function drawTables(board) {

    let arrayOfLists = arrayOfBoards[board].lists;

    // clears the screen
    document.getElementById('lists-area').innerHTML = "";


    //henter ut en html elementet som listene skal være inni
    let listsArea = document.getElementById('lists-area');

    //looper igjennom listen med lister
    for (let i = 0; i < arrayOfLists.length; i++) {
        let arrayOfCards = arrayOfLists[i].cards;

        drawList(arrayOfLists[i], i);

        let listElementContainer = document.getElementById(arrayOfLists[i].name+"container")
        let listElementBody = document.getElementById(arrayOfLists[i].name+"body")

        for (let j = 0; j < arrayOfCards.length; j++) {
            drawCard(arrayOfCards[j].name, listElementBody)
        }



    }
    let newListButtonContaner
    let newListButton = createHtmlElementWithText('button', 'New list');
    newListButton.id = "new-list";
    newListButton.className = "col-1 btn bg-light m-5";
    addModal(newListButton, 'list-modal');
    newListButton.onclick = function(e){
        listModal(e.target);
    }

    document.getElementById('content-area').appendChild(newListButton);
}

drawBoards();
drawTables(0); //input må være det boardet vi trykket på i "home" siden

/**
 * Ting å fikse
 * tabeller må kunne bytte navn
 * tabeller må kunne lages
 * */

/**
 * Bugs
 * Man kan ikke droppe kort i tomme kolonner
 * nye cards får ikke riktig navn på colonne
 */


