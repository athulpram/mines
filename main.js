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
    row.appendChild(generateCell(cell));
  }
  return row;
};

const generateCell = function(id) {
  let cell = document.createElement("td");
  cell.setAttribute("id", id);
  cell.setAttribute(
    "style",
    "height : 100px; width : 100px; border : 1px solid white; background : black"
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

const verfiyCell = function(id) {
  alert("left button clicked ");
};

const flagCell = function(id) {
  alert("right button clicked");
};
