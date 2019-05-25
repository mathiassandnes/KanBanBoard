/**
 * Genererer tabs
 */
//her lagres alle elementer på siden

let arrayOfBoards = group.group1.boards;

function drawBoards() {

    for (let i = 0; i < arrayOfBoards.length; i++) {
        let newTabButtonElement = createHtmlElementWithText('button', arrayOfBoards[i].name)
        newTabButtonElement.setAttribute("onclick", "drawTables("+i+")");
        document.getElementById('nav').appendChild(newTabButtonElement);
    }
}

function createHtmlElementWithText(tag, text){
    let element = document.createElement(tag);
    element.innerHTML = text;
    return element;
}

function createModal(name) {
    document.getElementById('cardModalLabel').innerHTML = name;
}


/**
 * Genererer alle listene, med kort og knapper
 */
function drawTables(board) {

//henter ut en liste med lister
    let arrayOfLists = arrayOfBoards[board].lists; // her må det finnes ut av hvilket board vi er på

//henter ut en html elementet som listene skal være inni
    let listsArea = document.getElementById('lists-area');

//looper igjennom listen med lister
    for (let i = 0; i < arrayOfLists.length; i++) {

        //lager et nytt html element
        let listElement = createHtmlElementWithText('div', arrayOfLists[i].name)

        let arrayOfCards = arrayOfLists[i].cards;

        listElement.className = "col-1"
        listElement.style.border= "2px solid black"
        //legger listen inni liste området
        listsArea.appendChild(listElement);


        // makes the cards for a list
        for (let j = 0; j < arrayOfCards.length; j++) {
            //lager et nytt html element
            let cardElement = createHtmlElementWithText('button', arrayOfCards[j].name)
            cardElement.setAttribute('data-toggle', 'modal');
            cardElement.setAttribute('data-target', '#cardModal');

            /**
             * BUG navnet blir feil
             */
            cardElement.addEventListener('click', createModal(arrayOfCards[j].name))

            cardElement.className="row";
            //legger kortet inn i listen
            listElement.appendChild(cardElement);

            /*************************
             kortene trenger drag'n'drop
             **************/
        }

        /**
         *Nytt kort knapp, trenger funksjonalitet
         */
        let newCardButton = createHtmlElementWithText('button', 'Nytt kort')

        newCardButton.className="row"
        listElement.appendChild(newCardButton);
    }

    /**
     *NY liste knapp, trenger funksjonalitet
     */

    var newListButton = createHtmlElementWithText('button', 'Ny liste')
    newListButton.id = "new-list";
    newListButton.className="col-1";
    listsArea.appendChild(newListButton);
}


drawBoards();
drawTables(0); //input må være det boardet vi trykket på i "home" siden