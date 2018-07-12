import React from "react";
import "./Board.css";

const renderCel = (makeMove, rowIndex, cellIndex, symbol, hasTurn, winnerCells) => {
  let clasje = null;

  //console.log(winnerCells,'winnerCells')
  winnerCells.forEach(cell => {
    if (cell[0]===rowIndex && cell[1]===cellIndex) {
      console.log('row',rowIndex,'col',cellIndex,'to blink')
      clasje = "board-tile-blink"
    }
  })

  if (symbol === "x" || symbol === 'X') {
    clasje = "board-tile-x";
  } else if (symbol === "o" || symbol === 'O') {
    clasje = "board-tile-o";
  } else {
    clasje = "board-tile-null";
  }

  return (
    <button
      className={clasje}
      disabled={hasTurn}
      onClick={() => makeMove(rowIndex, cellIndex)}
      key={`${rowIndex}-${cellIndex}`}
    >
      {/* {symbol || "-"} */}
    </button>
  );
};

export default ({ board, makeMove, winnerCells }) =>
  board.map((cells, rowIndex) => (
    <div key={rowIndex}>
      {cells.map((symbol, cellIndex) =>
        renderCel(makeMove, rowIndex, cellIndex, symbol, false, winnerCells)
      )}
    </div>
  ));
