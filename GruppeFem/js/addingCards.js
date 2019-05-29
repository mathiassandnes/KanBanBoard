


document.getElementById('create-new-card').addEventListener('click', function(){
    for (let i = 0; i < arrayOfLists.length; i++){
        //for (let j = 0; j)
        var e = document.getElementById("list-name");
        var strUser = e.options[e.selectedIndex].text;


        if(strUser == arrayOfLists[i].name){
            let cardElementContainer = document.createElement('div');
            let cardElement = document.createElement('li');
            cardElementContainer.appendChild(cardElement);
        }
    }






});