let array = [
    [0,0,0],
    [0,0,0],
    [0,0,0]
]
const win = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
]

let cpuChoice = randomize(0, array.length -1)
document.getElementById('gameEnd').style.display = "block";
const main = document.querySelector("#board");
const gameStatus = document.getElementById("gameStatus");
main.style.display='none';
gameStatus.style.display='none';
let playerOneTurn = true;
let turn = 0;
let isPlayable = true;
let cpuMode = true;

// FONCTION POUR PARCOURIR MON TABLEAU //
function frame() {
    main.innerHTML = ""
    array.forEach((e, i) => {
        const row = document.createElement("div")
        row.classList.add("row")
        main.appendChild(row)
        e.forEach((el, j) =>{
            const cell = document.createElement("div")
            cell.classList.add("cell")
            row.appendChild(cell)
            cell.addEventListener('click',() => {
                if (isPlayable) {
                    playGame(cell)
                }
            },{once:true})  
        })
    })
}
frame()
// FONCTION JOUER //
function playGame(cell) {
    if (playerOneTurn == true) {
        cell.innerHTML = "X"
    }else{
        cell.innerHTML = "O"
    }
    playerOneTurn = !playerOneTurn
    updateGameStatus(cell.innerHTML)
    checkWin(cell.innerHTML)
    if (isPlayable && playerOneTurn == false && cpuMode == true) {
        playCpu()
    }
    turn++
}
// FONCTION VICTOIRE et EGALITE //
function checkWin(cell) {
    let tabCells = document.querySelectorAll('.cell')
    console.log(tabCells);
    for (let i = 0; i < win.length; i++) {
        if (tabCells[win[i][0]].innerHTML != "") {
            if (tabCells[win[i][0]].innerHTML == tabCells[win[i][1]].innerHTML && tabCells[win[i][1]].innerHTML == tabCells[win[i][2]].innerHTML) {
                console.log("win");
                gameStatus.innerHTML = `Le joueur ${tabCells[win[i][0]].innerHTML} a gagné`;  
                endGame()
                return
                }    
        }
    }
    if (turn >= 8) {
        gameStatus.innerHTML = `Egalité! Personne ne Gagne! `;  
        endGame()
       }
}
// FONCTION AFFICHER LE STATUS //
function updateGameStatus(status) {
    let statusText;

    switch(status) {
        case "X" :
          statusText = "Au tour du joueur 2 (O)";
          break;
        case "O" :
          statusText = "Au tour du joueur 1 (X)";
          break;
    }
    gameStatus.innerHTML = statusText;
}
// FONCTION FIN DU MATCH //
function endGame() { 
    document.getElementById('gameEnd').style.display = "block";
    isPlayable = false
}
//FONCTION RESTART //
function reloadGame() {
    main.style.display='flex'
    gameStatus.style.display='block'
    turn = 0
    isPlayable = true
    playerOneTurn = true
    array = [
        [0,0,0],
        [0,0,0],
        [0,0,0]
    ]
    frame()
    gameStatus.innerHTML = `Le Joueur 1 commence ! `;
    document.getElementById('gameEnd').style.display = "none"
}
function randomize(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
function playCpu() {
    let tabCells = document.querySelectorAll('.cell')
    while (tabCells [cpuChoice].innerHTML != "") {
        cpuChoice = randomize(0, tabCells.length-1)
    }
    tabCells[cpuChoice].click()
    checkWin()
}
function reloadGameCpu(cpu) {
    cpuMode = cpu
    reloadGame()
}



