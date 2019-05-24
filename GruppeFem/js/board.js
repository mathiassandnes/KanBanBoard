/**
 * Genererer tabs
 */
//her lagres alle elementer på siden

let arrayOfBoards = group.group1.boards;

function drawBoards() {

    for (let i = 0; i < arrayOfBoards.length; i++) {
        newTabButtonElement = document.createElement('button');
        newTabButtonElement.innerHTML = arrayOfBoards[i].name;
        newTabButtonElement.setAttribute("onclick", "drawTables("+i+")");
        document.getElementById('nav').appendChild(newTabButtonElement);
    }
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
        let listElement = document.createElement('div');

        //setter teksten til diven lik navnet på listen
        listElement.innerHTML = arrayOfLists[i].name;

        let arrayOfCards = arrayOfLists[i].cards;

        //legger listen inni liste området
        listsArea.appendChild(listElement);

        for (let j = 0; j < arrayOfCards.length; j++) {
            //lager et nytt html element
            let cardElement = document.createElement('button');

            //setter teksten til diven lik navnet på kortet
            cardElement.innerHTML = arrayOfCards[j].name;

            //legger kortet inn i listen
            listElement.appendChild(cardElement);

            /*************************
             kortene trenger drag'n'drop
             **************/
        }

        /**
         *Nytt kort knapp, trenger funksjonalitet
         */
        let newCardButton = document.createElement('button');
        newCardButton.innerHTML = "Nytt kort"
        listElement.appendChild(newCardButton);
    }

    /**
     *NY liste knapp, trenger funksjonalitet
     */
    var newListButton = document.createElement('button');
    newListButton.id = "new-list";
    newListButton.innerHTML = "Ny Liste"
    listsArea.appendChild(newListButton);
}



drawBoards();
drawTables(0);