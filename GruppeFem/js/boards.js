var board = {
    board1:{
        name: "Webprosjekt",
        lists: [],
        member: [],
    },
    board2:{
        name: "Prosjekt",
        lists: [list.list3, list.list2, list.list1],
        member: [],
    },
    board3:{
        name: "Jobb",
        lists: [list.list2, list.list1, list.list3],
        member: [],
    },
    board4:{
        name: "Privat",
        lists: [list.list2, list.list1, list.list3],
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
