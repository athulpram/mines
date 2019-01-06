let mines = [];
let gridSize = 0;
const generateGrid = function(gridSize) {
  let table = document.createElement("table");
  for (let row = 0; row < gridSize; row++) {
    table.appendChild(generateRow(row * gridSize, gridSize));
  }
  table.setAttribute("id", "table");
  table.setAttribute("style", "border :1px solid black");
  document
    .getElementById("main")
    .replaceChild(table, document.getElementById("table"));
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
  cell.setAttribute(
    "style",
    "height : 100px; width : 100px; border : 1px solid white; background : black; color : white"
  );
  cell.setAttribute("onmousedown", "performButtonAction(event,this.id)");
  return cell;
};

const performButtonAction = function(event, id) {
  if (event.button == 2) {
    return flagCell(id);
  }
  verfiyCell(id);
};

const isMine = function(id) {
  return mines.includes(id);
};

const verfiyCell = function(id) {
  console.log("is mine", isMine(id));
  if (isMine(+id)) {
    alert("you lost game....");
    return 0;
  }
  console.log("here assign " + getNeighbourMines(id) + "id is" + id);
  document.getElementById(id).innerText = getNeighbourMines(+id);
};

const getNeighbourMines = function(id) {
  let neighbours = [
    id + 1,
    id - 1,
    id + gridSize,
    id - gridSize,
    id + gridSize + 1,
    id - gridSize - 1,
    id + gridSize - 1,
    id - gridSize + 1
  ];
  return neighbours.reduce((count, cell) => count + mines.includes(+cell), 0);
};

const flagCell = function(id) {
  alert("right button clicked");
};

const startGame = function(groundSize, numberOfMines) {
  // ground = new Array(groundSize).fill(0);
  gridSize = groundSize;
  for (let mine = 0; mine < numberOfMines; mine++) {
    let mineLocation;
    do {
      mineLocation = Math.floor(Math.random() * (groundSize * groundSize));
    } while (mines.includes(mineLocation));
    mines.push(mineLocation);
  }
  generateGrid(5);
};
