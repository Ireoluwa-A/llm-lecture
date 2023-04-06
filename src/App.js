import React, { useState } from 'react';
import './App.css';

function App() {
  const [board, setBoard] = useState(Array(9).fill(null)); // initialize the game board with null values
  const [player, setPlayer] = useState('X'); // start with player X
  const [winner, setWinner] = useState(null); // winner is null until someone wins or it's a draw

  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);

  const handleClick = (index) => {
    if (board[index] === null && winner === null) { // check if the cell is empty and there's no winner yet
      const newBoard = [...board]; // create a copy of the board
      newBoard[index] = player; // mark the cell with the current player's symbol
      setBoard(newBoard); // update the board state

      const winningCombinations = [
        // define all the possible winning combinations
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
      ];

      // check if any of the winning combinations are on the board
      for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
          setWinner(player); // set the winner to the current player
          return; // exit the function
        }
      }

      // check if the board is full and there's no winner
      if (!newBoard.includes(null)) {
        setWinner('draw'); // set the winner to 'draw'
      } else {
        setPlayer(player === 'X' ? 'O' : 'X'); // switch the player after each turn
      }
    }

    const newHistory = history.slice(0, stepNumber + 1);
    const current = newHistory[newHistory.length - 1];
    const squares = current.squares.slice();

    squares[index] = xIsNext ? "X" : "O";
    setHistory(newHistory.concat([{ squares: squares }]));
    setStepNumber(newHistory.length);
    setXIsNext(!xIsNext);

  };

  const handleReset = () => {
    setBoard(Array(9).fill(null)); // reset the board to null values
    setPlayer('X'); // reset the player to X
    setWinner(null); // reset the winner to null
  };
  
  function handleUndo() {
    if (stepNumber > 0) {
      setStepNumber(stepNumber - 1);
      setXIsNext((stepNumber - 1) % 2 === 0);
    }
  }
  
  const handleRedo = () => {
    if (stepNumber < history.length - 1) {
      setStepNumber(stepNumber + 1);
      setXIsNext(stepNumber % 2 === 0);
    }
  };

  return (
    <div className="App">
      <h1>Tic Tac Toe</h1>
      {winner ? (
        <h2>{winner === 'draw' ? 'It\'s a draw!' : `Player ${winner} wins!`}</h2>
      ) : (
        <h2>{`Player ${player}'s turn`}</h2>
      )}
      <div className="board">
        {board.map((cell, index) => (
          <div key={index} className="cell" onClick={() => handleClick(index)}>
            {cell}
          </div>
        ))}
      </div>
      <button onClick={handleReset}>Reset</button>
      {/* <div>{status}</div> */}
        <button onClick={handleUndo} disabled={stepNumber === 0}>
        Undo
        </button>
      <button onClick={handleRedo} disabled={stepNumber === history.length - 1}>
        Redo
      </button>

    </div>
  );
}

export default App;