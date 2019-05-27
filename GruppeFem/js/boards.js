board = {
    board1:{
        name: "Webprosjekt",
        lists: [],
        member: [],
    }
};

function leggTilTavle(){
    var row = document.getElementById("Group");
    var x = row.insertCell(-1);
    var y = document.getElementsByTagName("td").length;
    x.innerHTML = "tavle  " + y;
    x.onClick = addGroup();
}

function addGroup()
{
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
}
