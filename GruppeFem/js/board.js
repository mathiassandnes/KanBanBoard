/**
 * Genererer tabs
 */
//her lagres alle elementer på siden

let arrayOfBoards = group[0].boards;
let arrayOfLists = arrayOfBoards[0].lists;


function drawBoards() {
    for (let i = 0; i < arrayOfBoards.length; i++) {
        let newTabButtonElement = createHtmlElementWithText('button', arrayOfBoards[i].name);
        newTabButtonElement.setAttribute("onclick", "drawTables("+i+")");
        newTabButtonElement.className="btn-light rounded m-1"
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


/**
 * Genererer alle listene, med kort og knapper
 */
function drawTables(board) {

    // clears the screen
    document.getElementById('lists-area').innerHTML="";

//henter ut en liste med lister

//henter ut en html elementet som listene skal være inni
    let listsArea = document.getElementById('lists-area');

//looper igjennom listen med lister
    for (let i = 0; i < arrayOfLists.length; i++) {

        //lager et nytt html element
        let listElementContainer = document.createElement('li');
        let listElement = createHtmlElementWithText('div', arrayOfLists[i].name); // få dette større <legend>
        let listElementBody = document.createElement('ul');

        listElementContainer.className = "m-3 bg-dark rounded list-element p-1 col-1";
        listElementBody.className = "bg-info";


        var arrayOfCards = arrayOfLists[i].cards;


        listElement.id = i;
        listElement.className = "col-12 text-12 onboard-text text-center m-1 p-2"
        //legger listen inni liste området
        listElementContainer.appendChild(listElement);
        listElementContainer.appendChild(listElementBody);

        //legger til navnet til listen i en dropdown meny på kort modal
        document.getElementById('list-name').appendChild(createHtmlElementWithText('option', arrayOfLists[i].name));


        //adds card manipulation


        listElementContainer.onclick = function(e) {
            let cardNameInModal = document.getElementById('card-name-input');
            let cardDescriptionInModal = document.getElementById('card-description');
            let priorityInModal = document.getElementById('priority');
            let listNameInModal = document.getElementById('list-name');

            var isNewCard = true;
            var currentCard;

            // finds the correct card in backend and draws the modal with its values
            for(let x = 0; x < card.length; x++){
                if(e.target.innerHTML === card[x].name){

                    console.log('This card "Exists"')
                    currentCard = card[x];

                    cardNameInModal.value = currentCard.name;
                    cardDescriptionInModal.value = currentCard.description;
                    priorityInModal.options.selectedIndex = currentCard.priority;
                    listNameInModal.options.selectedIndex = i;
                    isNewCard = false;
                }
            }
            if(isNewCard) {
                console.log('This is a "new" card')
                cardNameInModal.value = "";
                cardDescriptionInModal.value = "";
                document.getElementById('priority').options.selectedIndex = 0;
            }


            document.getElementById('save-card-changes').onclick = function(){

                if(isNewCard){


                    currentCard = {
                        name: cardNameInModal.value,
                        description: cardDescriptionInModal.value,
                        priority: priorityInModal.options.selectedIndex
                    };
                    drawCard(currentCard.name, listElementBody);

                    arrayOfLists[i].cards.push(currentCard);
                    console.log(currentCard);
                    card.push(currentCard);
                }

                // changes name if updated
                if (cardNameInModal.value != currentCard.name){
                    e.target.innerHTML = cardNameInModal.value;
                    currentCard.name = cardNameInModal.value;
                }

                // changes description if updated
                if (cardDescriptionInModal.value != currentCard.description){
                    currentCard.description = cardDescriptionInModal.value;
                }

                // changes priority if updated
                if (priorityInModal.options.selectedIndex != currentCard.priority){
                    currentCard.priority = priorityInModal.options.selectedIndex;
                }



            };
        };

        // makes the cards for a list
        for (let j = 0; j < arrayOfCards.length; j++) {

            drawCard(arrayOfCards[j].name, listElementBody)
        }

        /**
         *Nytt kort knapp, trenger funksjonalitet
         */
        let newCardButton = createHtmlElementWithText('button', 'Nytt kort');

        //adds modal
        addModal(newCardButton, 'card-modal');

        newCardButton.className="center btn btn-primary col-12 new-card-button";
        listElementContainer.appendChild(newCardButton);

        listsArea.appendChild(listElementContainer);

    }

    /**
     *NY liste knapp, trenger funksjonalitet
     */

    var newListButton = createHtmlElementWithText('button', 'Ny liste');
    newListButton.id = "new-list";
    newListButton.className = "col-1 btn bg-light m-5";


    //adds modal
    addModal(newListButton, 'list-modal');



    listsArea.appendChild(newListButton);
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


