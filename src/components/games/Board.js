import React from "react";
import "./Board.css";

const renderCel = (makeMove, rowIndex, cellIndex, symbol, hasTurn) => {
  let clasje = null;

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

export default ({ board, makeMove }) =>
  board.map((cells, rowIndex) => (
    <div key={rowIndex}>
      {cells.map((symbol, cellIndex) =>
        renderCel(makeMove, rowIndex, cellIndex, symbol, false)
      )}
    </div>
  ));
