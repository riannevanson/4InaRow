import React from "react";
import "./Board.css";

const renderCel = (makeMove, rowIndex, cellIndex, symbol, hasTurn, winnerCells) => {
  let clasje = null;

  // Apply the board tile class to the button depending on the player 
  // symbol x or o
  if (symbol === "x") {
    clasje = "board-tile-x";
  } else if (symbol === "o") {
    clasje = "board-tile-o";
  } else {
    clasje = "board-tile-null";
  }

  // Apply the blinking board tile class to the button when 
  // it is part of the winning cells and distinguish by player symbol x or o
  winnerCells.forEach(cell => {
    if (cell[0]===rowIndex && cell[1]===cellIndex) {
      if (symbol === "x") 
        clasje = "board-tile-x-blink"
      else
        clasje = "board-tile-o-blink"
    }
  })

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
