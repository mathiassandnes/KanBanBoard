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
        let listElement = createHtmlElementWithText('ul', "<legend><b>"+arrayOfLists[i].name+"</b></legend><ol></ol>")

        let arrayOfCards = arrayOfLists[i].cards;

        listElement.id = i;
        listElement.className = "col-2 text-center bg-info m-1"
        //legger listen inni liste området
        listsArea.appendChild(listElement);

        // makes the cards for a list
        for (let j = 0; j < arrayOfCards.length; j++) {
            //lager et nytt html element
            let cardElement = createHtmlElementWithText('li', arrayOfCards[j].name)
            //adds modal
            cardElement.setAttribute('data-toggle', 'modal');
            cardElement.setAttribute('data-target', '#card-modal');

            cardElement.id = cardElement+i+j;

            // activates modal
            cardElement.addEventListener('click', function(){
                document.getElementById('card-name-input').setAttribute('placeholder', arrayOfCards[j].name);
                document.getElementById('card-description').innerText = arrayOfCards[j].description;
                document.getElementById('priority').options.selectedIndex = arrayOfCards[j].priority;
            });

            cardElement.className="col-12 btn btn-primary btn-md text-dark m-1 center";//btn btn-primary";
            //legger kortet inn i listen
            listElement.appendChild(cardElement);

        }

        /**
         *Nytt kort knapp, trenger funksjonalitet
         */
        let newCardButton = createHtmlElementWithText('button', 'Nytt kort');

        //adds modal
        newCardButton.setAttribute('data-toggle', 'modal');
        newCardButton.setAttribute('data-target', '#card-modal');

        newCardButton.addEventListener('click', function(){
            document.getElementById('card-name-input').setAttribute('placeholder', "name of task");
            document.getElementById('card-description').innerText = "description of task";
            document.getElementById('priority').options.selectedIndex = 0;
        });

        newCardButton.className="col-12 m-1 btn-danger";
        listElement.appendChild(newCardButton);

    }

    /**
     *NY liste knapp, trenger funksjonalitet
     */

    var newListButton = createHtmlElementWithText('button', 'Ny liste');
    newListButton.id = "new-list";
    newListButton.className = "col-1";


    //adds modal
    newListButton.setAttribute('data-toggle', 'modal');
    newListButton.setAttribute('data-target', '#list-modal');



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


