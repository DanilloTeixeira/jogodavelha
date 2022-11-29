// Variáveis globais úteis
const boardRegions = document.querySelectorAll("#gameBoard span");
let vBoard = []; //tabuleiro virtual (array para colocar valores)
let turnPlayer = ""; //string vazia ( jogador da vez)

//a função abaixo server para mostra o jogador da vez
function updateTitle() {
  const playerInput = document.getElementById(turnPlayer); //variável turnPlayer
  document.getElementById("turnPlayer").innerText = playerInput.value; //texto digitado no input para colocar o nome do jogador
}

//Essa função de começar o jogo

function initializeGame() {
  vBoard = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]; //array bi dimensional
  turnPlayer = "player1"; // string player1
  document.querySelector("h2").innerHTML =
    'Vez de: <span id="turnPlayer"></span>'; //ele vai buscar o text igual do html
  updateTitle(); //vai fazer com que exiba o nome na tela
  boardRegions.forEach(function (element) {
    element.classList.remove("win"); //vai remover a classe Win
    element.innerText = ""; //Retira qualquer ou a bolinha ou x
    element.classList.add("cursor-pointer");
    element.addEventListener("click", handleBoardClick); // Evento de click para quando clicar em qualquer região ele colocar o x ou O
  });
}
function getWinRegions() {
  const winRegions = [];
  if (
    vBoard[0][0] &&
    vBoard[0][0] === vBoard[0][1] &&
    vBoard[0][0] === vBoard[0][2]
  )
    winRegions.push("0.0", "0.1", "0.2");
  if (
    vBoard[1][0] &&
    vBoard[1][0] === vBoard[1][1] &&
    vBoard[1][0] === vBoard[1][2]
  )
    winRegions.push("1.0", "1.1", "1.2");
  if (
    vBoard[2][0] &&
    vBoard[2][0] === vBoard[2][1] &&
    vBoard[2][0] === vBoard[2][2]
  )
    winRegions.push("2.0", "2.1", "2.2");
  if (
    vBoard[0][0] &&
    vBoard[0][0] === vBoard[1][0] &&
    vBoard[0][0] === vBoard[2][0]
  )
    winRegions.push("0.0", "1.0", "2.0");
  if (
    vBoard[0][1] &&
    vBoard[0][1] === vBoard[1][1] &&
    vBoard[0][1] === vBoard[2][1]
  )
    winRegions.push("0.1", "1.1", "2.1");
  if (
    vBoard[0][2] &&
    vBoard[0][2] === vBoard[1][2] &&
    vBoard[0][2] === vBoard[2][2]
  )
    winRegions.push("0.2", "1.2", "2.2");
  if (
    vBoard[0][0] &&
    vBoard[0][0] === vBoard[1][1] &&
    vBoard[0][0] === vBoard[2][2]
  )
    winRegions.push("0.0", "1.1", "2.2");
  if (
    vBoard[0][2] &&
    vBoard[0][2] === vBoard[1][1] &&
    vBoard[0][2] === vBoard[2][0]
  )
    winRegions.push("0.2", "1.1", "2.0");
  return winRegions;
}

//função para desabilitar a region
function disableRegion(element) {
  element.classList.remove("cursor-pointer");
  element.removeEventListener("click", handleBoardClick); // e vai remover o evento tipo Click = elemento handleBoardClick
}
//função para informar o vencedor
function handleWin(regions) {
  regions.forEach(function (region) {
    document
      .querySelector('[data-region="' + region + '"]')
      .classList.add("win");
  });
  const playerName = document.getElementById(turnPlayer).value;
  document.querySelector("h2").innerHTML = playerName + " Venceu! ";
}

//Função HandleBoarClick vai servir para quando for clicar no board
function handleBoardClick(ev) {
  //função, span= parâmetro do evento)
  const span = ev.currentTarget;
  const region = span.dataset.region; //N.N (span=parâmetro) - (currentTarget= seria Span) - (dataset-region="0.0")
  const rowColumnPair = region.split("."); // ["N", "N"] (rowColumnPair= Par linha Coluna)-(region=string)-(split=Método serve para dividir suma string transformando ela num array, onde ele tiver ponto )
  const row = rowColumnPair[0]; //linha
  const column = rowColumnPair[1]; //coluna
  if (turnPlayer === "player1") {
    span.innerText = "X";
    vBoard[row][column] = "X";
  } else {
    span.innerText = "O";
    vBoard[row][column] = "O";
  }
  console.clear();
  console.table(vBoard); //mostra tabela no console
  disableRegion(span);
  const winRegions = getWinRegions(); //region vitoriosa
  if (winRegions.length > 0) {
    //se nosso winRegions tem alguma coisa dentro se sua length for maior > do que 0 a função deu bom retornou algo, caso seja menor 0 continua o jogo abaixo
    handleWin(winRegions);
  } else if (vBoard.flat().includes("")) {
    // método Flat ele retorna um novo array com todos elementos, subarray concatenados, vai transformar array unidimensional
    turnPlayer = turnPlayer === "player1" ? "player2" : "player1";
    updateTitle();
  } else {
    document.querySelector("h2").innerHTML = "Empate!";
  }
}

document.getElementById("start").addEventListener("click", initializeGame); // função que vai chamar o initializeGame para iniciar
