/**
 * Genererer tabs
 */
//her lagres alle elementer på siden

let arrayOfBoards = group.group1.boards;
let arrayOfLists = arrayOfBoards[0].lists;


function drawBoards() {
    for (let i = 0; i < arrayOfBoards.length; i++) {
        let newTabButtonElement = createHtmlElementWithText('button', arrayOfBoards[i].name);
        newTabButtonElement.setAttribute("onclick", "drawTables("+i+")");

        newTabButtonElement.className="btn-primary m-1"
        document.getElementById('nav').appendChild(newTabButtonElement);
    }
}

function createHtmlElementWithText(tagName, text){
    let element = document.createElement(tagName);
    element.innerHTML = text;
    return element;
}

/**
 * Genererer alle listene, med kort og knapper
 */

function drawList(parent){

}

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
        listElementContainer.className = "m-3 bg-info list-element p-1";


        var arrayOfCards = arrayOfLists[i].cards;

        listElement.id = arrayOfLists[i].name;

        listElement.className = "col-12 text-12 text-center m-1 p-2"
        //legger listen inni liste området
        listElementContainer.appendChild(listElement);
        listElementContainer.appendChild(listElementBody);

        //legger til navnet til listen i en dropdown meny på kort modal
        document.getElementById('list-name').appendChild(createHtmlElementWithText('option', arrayOfLists[i].name));

        // makes the cards for a list
        for (let j = 0; j < arrayOfCards.length; j++) {
            //lager et nytt html element
            let cardElementContainer = document.createElement('li');
            let cardElement = createHtmlElementWithText('div', arrayOfCards[j].name);
            cardElementContainer.className="center col-12";

            //adds modal
            cardElement.setAttribute('data-toggle', 'modal');
            cardElement.setAttribute('data-target', '#card-modal');

            cardElement.id = i+j;


            // activates modal
            cardElement.addEventListener('click', function() {


                //clears modal
                document.getElementById('card-name-input').value = "";
                document.getElementById('card-description').innerText = "";

                //gives correct values depending on card
                document.getElementById('card-name-input').setAttribute('placeholder', arrayOfCards[j].name);
                document.getElementById('card-description').innerText = arrayOfCards[j].description;
                document.getElementById('priority').options.selectedIndex = arrayOfCards[j].priority;
                document.getElementById('list-name').options.selectedIndex = i;

                //saves changes
                document.getElementById('create-new-card').addEventListener('click', function () {
                    let currentCard = arrayOfLists[i].cards[j];

                    let nameInput = document.getElementById('card-name-input').value;
                    let descriptionInput = document.getElementById('card-description').innerText;
                    let drawnCard = document.getElementById(i+j);


                    if (nameInput != ""){
                        drawnCard.innerHTML = nameInput;
                        currentCard.name = nameInput;
                    }

                    currentCard.description = descriptionInput;

                    //priority
                    //list-name
                });

                //saves changes

            });

            cardElement.className="btn btn-primary text-dark m-1 center col-12";//btn btn-primary";
            //legger kortet inn i listen
            cardElementContainer.appendChild(cardElement);
            listElementBody.appendChild(cardElementContainer);

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




            document.getElementById('create-new-card').addEventListener('click', function () {
                /**
                 * HER LAGER MAN NYTT KORT
                 */
            });
        });

        newCardButton.className="center btn btn-danger col-12 new-card-button";
        listElementContainer.appendChild(newCardButton);
        listsArea.appendChild(listElementContainer);

    }

    /**
     *NY liste knapp, trenger funksjonalitet
     */

    var newListButton = createHtmlElementWithText('button', 'Ny liste');
    newListButton.id = "new-list";
    newListButton.className = "col-1 btn btn-primary m-5";


    //adds modal
    newListButton.setAttribute('data-toggle', 'modal');
    newListButton.setAttribute('data-target', '#list-modal');



    listsArea.appendChild(newListButton);
}

drawBoards();
drawTables(0); //input må være det boardet vi trykket på i "home" siden

/**
 * Ting å fikse
 * cards må kunne oppdateres
 * cards må kunne lages
 * */

/**
 * Bugs
 * Alle list-name i modal blir feil
 * Man kan ikke droppe kort i tomme kolonner
 */


