function allowDrop(e){
    e.preventDefault();
    if (e.target.getAttribute("draggable") == "true") {
        e.dataTransfer.dropEffect = "none";
    }else{
        e.dataTransfer.dropEffect = "all";
    }
}
function drag(e){
    e.dataTransfer.setData("text", e.target.id);
}

function drop(e){
    e.preventDefault();
    let data = e.dataTransfer.getData("text");
    e.target.append(document.getElementById(data));
}