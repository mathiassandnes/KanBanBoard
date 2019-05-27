/**
 * Genererer tabs
 */
//her lagres alle elementer på siden

let arrayOfBoards = group.group1.boards;

function drawBoards() {
    for (let i = 0; i < arrayOfBoards.length; i++) {
        let newTabButtonElement = createHtmlElementWithText('button', arrayOfBoards[i].name);
        newTabButtonElement.setAttribute("onclick", "drawTables("+i+")");
        document.getElementById('nav').appendChild(newTabButtonElement);
    }
}

function createHtmlElementWithText(tag, text){
    let element = document.createElement(tag);
    element.innerHTML = text;
    return element;
}

/**
 * Genererer alle listene, med kort og knapper
 */
function drawTables(board) {

    // clears the screen
    document.getElementById('lists-area').innerHTML="";


//henter ut en liste med lister
    let arrayOfLists = arrayOfBoards[board].lists; // her må det finnes ut av hvilket board vi er på

//henter ut en html elementet som listene skal være inni
    let listsArea = document.getElementById('lists-area');

//looper igjennom listen med lister
    for (let i = 0; i < arrayOfLists.length; i++) {

        //lager et nytt html element
        let listElement = createHtmlElementWithText('div', arrayOfLists[i].name)
        listElement.setAttribute('ondrop', 'drop(event)');
        listElement.setAttribute('ondragover', 'allowDrop(event)');
        listElement.style.border = "solid black 2px";

        let arrayOfCards = arrayOfLists[i].cards;


        listElement.className = "col-1 text-center"
        //legger listen inni liste området
        listsArea.appendChild(listElement);


        // makes the cards for a list
        for (let j = 0; j < arrayOfCards.length; j++) {
            //lager et nytt html element
            let cardElement = createHtmlElementWithText('button', arrayOfCards[j].name)
            //adds modal
            cardElement.setAttribute('data-toggle', 'modal');
            cardElement.setAttribute('data-target', '#card-modal');

            //adds dragging
            cardElement.setAttribute('draggable', 'true');
            cardElement.setAttribute('ondragstart', 'drag(event)');
            cardElement.setAttribute('ondrop', '');
            cardElement.setAttribute('ondragover', '');




            cardElement.id = card+i+j;

            cardElement.addEventListener('click', function(){
                document.getElementById('card-name-input').setAttribute('placeholder', arrayOfCards[j].name);
                document.getElementById('card-description').innerText = arrayOfCards[j].description;



            });

            cardElement.className="col-12 btn btn-success btn-md text-dark";//btn btn-primary";
            //legger kortet inn i listen
            listElement.appendChild(cardElement);

            /*************************
             kortene trenger drag'n'drop
             **************/
        }

        /**
         *Nytt kort knapp, trenger funksjonalitet
         */
        let newCardButton = createHtmlElementWithText('button', 'Nytt kort');

        newCardButton.setAttribute('data-toggle', 'modal');
        newCardButton.setAttribute('data-target', '#cardModal');

        newCardButton.className="col-12 float-bottom";
        listElement.appendChild(newCardButton);

    }

    /**
     *NY liste knapp, trenger funksjonalitet
     */

    var newListButton = createHtmlElementWithText('button', 'Ny liste');
    newListButton.id = "new-list";
    newListButton.className = "col-1";

    newListButton.setAttribute('data-toggle', 'modal');
    newListButton.setAttribute('data-target', '#listModal');

    listsArea.appendChild(newListButton);
}

function saveCardChanges() {

}

drawBoards();
drawTables(0); //input må være det boardet vi trykket på i "home" siden



/*****
 * Ting å fikse
 * cards må lagre prioritet
 * cards må kunne oppdateres
 * cards må kunne lages
 *
 *
 * */


