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


// gjør at du kan trykke på enter for lagre en modal
function giveOnEnterPress(input,funcButton) {
    let cardInputField = document.getElementById(input);
    cardInputField.addEventListener("keyup",function (event) {
        if(event.key === "Enter"){
            document.getElementById(funcButton).click();
        }
    });
}