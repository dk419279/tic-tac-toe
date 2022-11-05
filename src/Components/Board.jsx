import React, { useState } from "react";
import "./Board.css";

const Board = (props) => {
  const emptyBoard = [
    ["-", "-", "-"],
    ["-", "-", "-"],
    ["-", "-", "-"],
  ];

  const [board, setBoard] = useState(emptyBoard);
  const [whosTurn, setWhosTurn] = useState("X");
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [matchHistory, setMatchHistory] = useState([]);

  const isValidMove = (i, j) => {
    if (board[i][j] == "-") {
      return true;
    }
    return false;
  };

  const flipTurn = () => {
    if (whosTurn == "X") {
      return "O";
    }
    return "X";
  };

  const arrayEquals = (arr1, arr2) => {
    if (arr1.length != arr2.length) {
      return false;
    }
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] != arr2[i]) {
        return false;
      }
    }
    return true;
  };

  const gameEngine = (i, j) => {
    if (!isValidMove(i, j)) {
      alert("invalid move");
    }
    const boardCopy = [...board];
    boardCopy[i][j] = whosTurn;
    setBoard(boardCopy);
    checkingUP();
    setWhosTurn(flipTurn());
  };

  const checkingUP = (event) => {
    const winCombos = [
      [
        [0, 0], //i=0 j=0
        [0, 1], //i=0 j=1
        [0, 2], //i=0 j=2
      ],
      [
        [1, 0], //i=1 j=0
        [1, 1], //i=1 j=1
        [1, 2], //i=1 j=2
      ],
      [
        [2, 0], //i=2 j=0
        [2, 1], //i=2 j=1
        [2, 2], //i=2 j=2
      ],
      [
        [0, 0],
        [1, 0],
        [2, 0],
      ],
      [
        [0, 1],
        [1, 1],
        [2, 1],
      ],
      [
        [0, 2],
        [1, 2],
        [2, 2],
      ],
      [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      [
        [0, 2],
        [1, 1],
        [2, 0],
      ],
    ];

    const addToMatchHistory = (result) => {
      const currentHistory = matchHistory; // = []
      currentHistory.push(result); // = [] + [result]
      setMatchHistory(currentHistory);
    };

    for (let i = 0; i < winCombos.length; i++) {
      let allCombo = true;
      for (let j = 0; j < winCombos[i].length; j++) {
        const [x, y] = winCombos[i][j];
        if (board[x][y] != "X") {
          allCombo = false;
        }
      }
      let result = "X";
      if (allCombo) {
        // console.log("gotemX");
        setBoard(emptyBoard);
        setPlayer1Score(player1Score + 1);
        addToMatchHistory(result);
      } else {
        // console.log("didntgetem");
      }
    }
    for (let i = 0; i < winCombos.length; i++) {
      let allCombo = true;
      for (let j = 0; j < winCombos[i].length; j++) {
        const [x, y] = winCombos[i][j];
        if (board[x][y] != "O") {
          allCombo = false;
        }
      }
      let result = "O";
      if (allCombo) {
        // console.log("gotemO");
        setBoard(emptyBoard);
        setPlayer2Score(player2Score + 1);
        addToMatchHistory(result);
      } else {
        // console.log("didntgetem");
      }
    }
  };

  const Cell = (props) => {
    return (
      <td>
        <button onClick={() => gameEngine(props.row, props.column)}>
          {props.board[props.row][props.column]}
        </button>
      </td>
    );
  };

  return (
    <div className="tic-tac-toe-table">
      <table>
        <tbody>
          <tr>
            <Cell board={board} row={0} column={0} key="00" />
            <Cell board={board} row={0} column={1} key="01" />
            <Cell board={board} row={0} column={2} key="02" />
          </tr>
          <tr>
            <Cell board={board} row={1} column={0} key="10" />
            <Cell board={board} row={1} column={1} key="11" />
            <Cell board={board} row={1} column={2} key="12" />
          </tr>
          <tr>
            <Cell board={board} row={2} column={0} key="20" />
            <Cell board={board} row={2} column={1} key="21" />
            <Cell board={board} row={2} column={2} key="22" />
          </tr>
        </tbody>
      </table>
      <p className="score-player-1">player 1 score = {player1Score}</p>
      <p className="score-player-2">player 2 score = {player2Score}</p>
      <div className="match-history">
        {matchHistory.length > 0 ? (
          <h2>Match History</h2>
        ) : (
          <h2>No Match History</h2>
        )}
        {matchHistory.map((item) => (
          <p>The winner is {item}!</p>
        ))}
      </div>
    </div>
  );
};

export default Board;
