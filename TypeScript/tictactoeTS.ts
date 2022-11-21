const body = document.getElementById("body") as HTMLElement
//wywolanie funkcji
HeadingCreating()
MainDefining()
TableRender()

//types
type headersH1 = HTMLHeadingElement
type classes = string
type IDs = string
type titles = string
type players = string
type dives = HTMLDivElement


//headings
var currentMove;
function HeadingCreating(): void {
    let title = document.createElement("h1") as headersH1
    let titleText: titles = "Tic Tac Toe Game"
    title.innerText = titleText
    body.appendChild(title)

    currentMove = document.createElement("h1") as headersH1
}

//main
function MainDefining(): void {
    const main = document.createElement("div") as dives
    body.appendChild(main)
    let classOfMain: classes;
    let idOfMain: IDs = classOfMain = "main"
    main.id = idOfMain
    main.setAttribute("class", classOfMain)
}

//table
function TableRender(): void {
    let table = document.createElement("table") as HTMLTableElement
    let classOfTable: classes = "table"
    table.setAttribute("class", classOfTable)
    for (let i: number = 0; i < 3; i++) {
        var tr = document.createElement("tr") as HTMLTableRowElement
        for (let j: number = 0; j < 3; j++) {
            let td = document.createElement("td") as HTMLTableCellElement
            switch (i) {
                case 0:
                    td.id = j as any as IDs
                    break;
                case 1:
                    td.id = (i + j + 2) as any as IDs
                    break;
                case 2:
                    td.id = (i + j + 4) as any as IDs
                    break;
            }
            tr.appendChild(td)
        }
        table.append(tr)
    }
    globalThis.main.appendChild(table)
}

//Logic
var currentPlayer: string = "X"
type moveArrays = Array<number>
var QueueX: moveArrays = []
var QueueY: moveArrays = []
var move: number = 0

const winArray: number[][] = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [3, 4, 5],
    [1, 4, 7],
    [2, 5, 8],
    [6, 7, 8],
    [2, 4, 6],
]
var X: players = "X"
var O: players = "O"
var win: number = 0 // flague

const checker = (arr: any, target: any) => target.every(v => arr.includes(v))

function WhichPlayer(CellId): void {
    (move % 2 == 0) ? currentPlayer = X : currentPlayer = O;
    var parsedCellId: number = parseInt(CellId);
    (move % 2 == 0) ? QueueY.push(parsedCellId) : QueueX.push(parsedCellId)
    QueueX.sort()
    QueueY.sort()
    IsWin()
    currentPlayerHandler(currentPlayer as unknown);
    if (win = 0) {
        isDraft()
    }
}

var currentPlayerHandler = (currentPlayer): void => { currentMove.innerText = `Now it's ${currentPlayer}'s move!` }

function isDraft(): void {
    if (move == 9) {
        Draft()
        DisableClicking()
    }
}

function IsWin(): void {
    for (let i: number = 0; i < winArray.length; i++) {
        if (checker(QueueX, winArray[i])) {
            WinDisplay(X)
            DisableClicking()
            currentMove.remove()
        } else if (checker(QueueY, winArray[i])) {
            WinDisplay(O)
            DisableClicking()
            currentMove.remove()
        } else {
            win = 0;
        }
    }
}

function DisableClicking(): void {
    document.addEventListener("click", handler, true)

    function handler(e: any) {
        e.stopPropagation()
        e.preventDefault()
    }
}

function WinDisplay(currentPlayer): void {
    let winningDiv = document.createElement("div") as dives;
    let IdOfMessage: IDs = "draftDiv"
    winningDiv.id = IdOfMessage
    winningDiv.innerText = `Player ${currentPlayer} won!`
    globalThis.main.appendChild(winningDiv)
}

function Draft() {
    let draftDiv = document.createElement("div") as dives;
    let IdOfDraft: IDs = "draftDiv"
    draftDiv.id = IdOfDraft;
    draftDiv.innerText = `Draft!`
    globalThis.main.appendChild(draftDiv)
}

const tableCells = document.getElementsByTagName("td")

const cellPressed = e => {
    let selectedCell = e.target;
    let CellId = selectedCell.id;
    if (!selectedCell.innerText) {
        selectedCell.innerText = currentPlayer
        move += 1;
        WhichPlayer(CellId)
    }
}
var cell: any;
for (cell of tableCells) {
    cell.addEventListener("click", cellPressed)
}



