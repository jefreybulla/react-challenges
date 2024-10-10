/*
Approach:
- Change X to O and O to X per turn
- On every turn check if game ended
  - check affected row
  - check affected column
  - check two diagonals
*/


import { useState } from 'react';

function TicTacToe() {
  const initialBoard = [['B', 'B', 'B'],['B', 'B', 'B'],['B', 'B', 'B']]
  const [playingPlayer1, setPlayingPlayer1 ] = useState(true)
  const [board, setBoard] = useState(initialBoard)
  const [endOfGame, setEndOfGame] = useState(false)

  const checkRow = (updatedBoard, row) => {
    let value = undefined
    for(let item of updatedBoard[row]){
      if(value == undefined){
        value = item
      }
      else{
        if(value != item){
          return false
        }
      }
    }
    return true
  }

  const checkColumn = (updatedBoard, column) => {
    let value = undefined
    for(let i=0;i<updatedBoard.length;i++){
      //console.log(updatedBoard[i][column])
      if(value == undefined){
        value = updatedBoard[i][column]
      }
      else{
        if(value != updatedBoard[i][column]){
          return false
        }
      }
    }
    return true
  }

  const checkDiagonals = (updatedBoard) => {
    if(updatedBoard[0][0] == updatedBoard[1][1] && updatedBoard[1][1] == updatedBoard[2][2]){
      if(updatedBoard[0][0] != 'B'){
        return true
      }
    }
    if(updatedBoard[0][2] == updatedBoard[1][1] && updatedBoard[1][1] == updatedBoard[2][0]){
      if(updatedBoard[0][2] != 'B'){
        return true
      }
    }
    return false
  }

  const handleClick = (x,y) => {
    if(endOfGame){
      return
    }
    const updatedBoard = structuredClone(board)
    if(playingPlayer1){
      updatedBoard[x][y] = 'X'
      setBoard(updatedBoard)
    }
    else{
      updatedBoard[x][y] = 'O'
      setBoard(updatedBoard)
    }
    // check if game ended
    if (checkRow(updatedBoard, x) || checkColumn(updatedBoard, y) || checkDiagonals(updatedBoard)){
      if (playingPlayer1){
        console.log('Player X won!')
      }
      else{
        console.log('Player O won!')
      }
      setEndOfGame(true)
    }
    else{
      setPlayingPlayer1(!playingPlayer1)
    } 
  }

  const renderWinner = () => {
    if(endOfGame){
      if(playingPlayer1){
        return <>Player X won!</>
      }
      else{
        return <>Player O won!</>
      }
    }
  }
  return (
    <div className="App">
      <h1>Tic Tac Toe</h1>
      <div><button onClick={() => handleClick(0,0)}>{board[0][0]}</button><button onClick={() => handleClick(0,1)}>{board[0][1]}</button><button onClick={() => handleClick(0,2)}>{board[0][2]}</button></div>
      <div><button onClick={() => handleClick(1,0)}>{board[1][0]}</button><button onClick={() => handleClick(1,1)}>{board[1][1]}</button><button onClick={() => handleClick(1,2)}>{board[1][2]}</button></div>
      <div><button onClick={() => handleClick(2,0)}>{board[2][0]}</button><button onClick={() => handleClick(2,1)}>{board[2][1]}</button><button onClick={() => handleClick(2,2)}>{board[2][2]}</button></div>
      { renderWinner() }
    </div>
  );
}

export default TicTacToe
