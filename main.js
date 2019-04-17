let mines = [];
let gridSize = 0;
let ground = [];
const generateGrid = function(gridSize) {
  let table = document.createElement("table");
  for (let row = 0; row < gridSize; row++) {
    table.appendChild(generateRow(row * gridSize, gridSize));
  }
  table.setAttribute("id", "table");
  table.setAttribute("style", "border :1px solid black");
  document
    .getElementById("minesTable")
    .replaceChild(table, document.getElementById("table"));
  showGameData();
};

const showGameData = function() {
  const dataBoard = document.createElement("div");
  const mineNumberView = document.createElement("div");

  const mineNumberViewTitle = document.createElement("span");
  mineNumberViewTitle.innerText = "Mines  ";

  const minesNumberViewCount = document.createElement("span");
  minesNumberViewCount.innerText = +mines.length;

  mineNumberView.appendChild(mineNumberViewTitle);
  mineNumberView.appendChild(minesNumberViewCount);

  dataBoard.appendChild(mineNumberView);

  document.getElementById("minesData").innerHTML = "";
  document.getElementById("minesData").appendChild(dataBoard);
  document.getElementById("minesData").className = "mines-data";
};

const generateRow = function(stratCell, gridSize) {
  let row = document.createElement("tr");
  for (let cell = stratCell; cell < gridSize + stratCell; cell++) {
    row.appendChild(generateCell(cell, gridSize));
  }
  return row;
};

const generateCell = function(id) {
  let cell = document.createElement("td");
  cell.setAttribute("id", id);
  cell.setAttribute("class", "groundCell");
  cell.setAttribute("onmousedown", "performButtonAction(event,this.id)");
  return cell;
};

const performButtonAction = function(event, id) {
  if (event.button == 2) {
    return flagCell(id);
  }
  verfiyCell(id);
  document.getElementById(id).innerText = ground[id];
};

const isMine = function(id) {
  return mines.includes(id);
};

const gameLost = function() {
  alert("you lost game....");
  document.getElementById("main").setAttribute("disabled", "disabled");
};

const gameWon = function() {
  alert("Congrats.. You won");
  document.getElementById("main").setAttribute("disabled", "disabled");
};

const verfiyCell = function(id) {
  console.log("is mine", isMine(id));
  if (isMine(+id)) {
    gameLost();
    return 0;
  }
  ground[id] = getNeighbourMinesCount(+id);
  if (checkVictory()) {
    gameWon();
  }
};

const checkVictory = function() {
  return !ground.filter(value => value == "e").length;
};

const getNeighbourMinesCount = function(id) {
  let neighbours = getValidatedNeighbours(id);
  return neighbours.reduce((count, cell) => count + mines.includes(+cell), 0);
};

const getValidatedNeighbours = function(id) {
  let neighbours = [id + gridSize, id - gridSize];
  if (Math.floor(id / 5) == Math.floor((id + 1) / 5)) {
    neighbours.push(id + 1, id + 6, id - 4);
  }
  if (Math.floor(id / 5) == Math.floor((id - 1) / 5)) {
    neighbours.push(id - 1, id - 6, id + 4);
  }
  return neighbours;
};

const flagCell = function(id) {
  document.getElementById(id).innerText = "f";
};

const startGame = function() {
  document.getElementById("tableData").className = "table-data-after-start";
  const groundSize = +document.getElementById("groundSize").value;
  const numberOfMines = +document.getElementById("numberOfMines").value;
  ground = new Array(groundSize * groundSize).fill("e");
  gridSize = groundSize;
  for (let mine = 0; mine < numberOfMines; mine++) {
    let mineLocation;
    do {
      mineLocation = Math.floor(Math.random() * (groundSize * groundSize));
    } while (mines.includes(mineLocation));
    mines.push(mineLocation);
    ground[mineLocation] = "m";
  }
  generateGrid(groundSize);
};

window.onload = () => {
  document.getElementById("tableData").className = "table-data-before-start";
};
