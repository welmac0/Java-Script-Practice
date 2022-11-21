var body = document.getElementById("body");
//wywolanie funkcji
HeadingCreating();
MainDefining();
TableRender();
//headings
var currentMove;
function HeadingCreating() {
    var title = document.createElement("h1");
    var titleText = "Tic Tac Toe Game";
    title.innerText = titleText;
    body.appendChild(title);
    currentMove = document.createElement("h1");
}
//main
function MainDefining() {
    var main = document.createElement("div");
    body.appendChild(main);
    var classOfMain;
    var idOfMain = classOfMain = "main";
    main.id = idOfMain;
    main.setAttribute("class", classOfMain);
}
//table
function TableRender() {
    var table = document.createElement("table");
    var classOfTable = "table";
    table.setAttribute("class", classOfTable);
    for (var i = 0; i < 3; i++) {
        var tr = document.createElement("tr");
        for (var j = 0; j < 3; j++) {
            var td = document.createElement("td");
            switch (i) {
                case 0:
                    td.id = j;
                    break;
                case 1:
                    td.id = (i + j + 2);
                    break;
                case 2:
                    td.id = (i + j + 4);
                    break;
            }
            tr.appendChild(td);
        }
        table.append(tr);
    }
    globalThis.main.appendChild(table);
}
//Logic
var currentPlayer = "X";
var QueueX = [];
var QueueY = [];
var move = 0;
var winArray = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [3, 4, 5],
    [1, 4, 7],
    [2, 5, 8],
    [6, 7, 8],
    [2, 4, 6],
];
var X = "X";
var O = "O";
var win = 0; // flague
var checker = function (arr, target) { return target.every(function (v) { return arr.includes(v); }); };
function WhichPlayer(CellId) {
    (move % 2 == 0) ? currentPlayer = X : currentPlayer = O;
    var parsedCellId = parseInt(CellId);
    (move % 2 == 0) ? QueueY.push(parsedCellId) : QueueX.push(parsedCellId);
    QueueX.sort();
    QueueY.sort();
    IsWin();
    currentPlayerHandler(currentPlayer);
    if (win = 0) {
        isDraft();
    }
}
var currentPlayerHandler = function (currentPlayer) { currentMove.innerText = "Now it's ".concat(currentPlayer, "'s move!"); };
function isDraft() {
    if (move == 9) {
        Draft();
        DisableClicking();
    }
}
function IsWin() {
    for (var i = 0; i < winArray.length; i++) {
        if (checker(QueueX, winArray[i])) {
            WinDisplay(X);
            DisableClicking();
            currentMove.remove();
        }
        else if (checker(QueueY, winArray[i])) {
            WinDisplay(O);
            DisableClicking();
            currentMove.remove();
        }
        else {
            win = 0;
        }
    }
}
function DisableClicking() {
    document.addEventListener("click", handler, true);
    function handler(e) {
        e.stopPropagation();
        e.preventDefault();
    }
}
function WinDisplay(currentPlayer) {
    var winningDiv = document.createElement("div");
    var IdOfMessage = "draftDiv";
    winningDiv.id = IdOfMessage;
    winningDiv.innerText = "Player ".concat(currentPlayer, " won!");
    globalThis.main.appendChild(winningDiv);
}
function Draft() {
    var draftDiv = document.createElement("div");
    var IdOfDraft = "draftDiv";
    draftDiv.id = IdOfDraft;
    draftDiv.innerText = "Draft!";
    globalThis.main.appendChild(draftDiv);
}
var tableCells = document.getElementsByTagName("td");
var cellPressed = function (e) {
    var selectedCell = e.target;
    var CellId = selectedCell.id;
    if (!selectedCell.innerText) {
        selectedCell.innerText = currentPlayer;
        move += 1;
        WhichPlayer(CellId);
    }
};
var cell;
for (var _i = 0, tableCells_1 = tableCells; _i < tableCells_1.length; _i++) {
    cell = tableCells_1[_i];
    cell.addEventListener("click", cellPressed);
}
