import React, { Component } from 'react';
import styled from 'styled-components';
import Square from './Square.js';

const StyledRow = styled.div`
  display: flex;
  width: 100%;
`;

const StyledStatus = styled.div`
position: relative;
background-color: beige;
font-size: 50px;
padding: 50px;
width: 500px;
margin: 0 auto;
`;

const StyledButton = styled.button`
  position: relative;
  padding: 5px;
  font-size: 60px;
  width: 400px;
  margin: 10px auto;
  left: 18%;

`;

class Board extends Component {
  constructor(props) {
    super(props);

    this.InitialState = {
      squares: Array(9).fill(null),
      isBlueTurn: true,
    };

    this.state = this.InitialState;
    this.resetGame = this.resetGame.bind(this);
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    if (checkWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.blueIsNext ? 'blue' : 'red';
    this.setState({
      squares,
      blueIsNext: !this.state.blueIsNext,
    });
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const winner = checkWinner(this.state.squares);
    let status;
    if (winner) {
      status = `${winner} WON the game`;
    } else {
      status = `Next Player: ${this.state.blueIsNext ? 'blue' : 'red'}`;
    }
    return (
      <div>
      <StyledStatus className="status">{status}</StyledStatus>
        <StyledRow>
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </StyledRow>
        <StyledRow>
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </StyledRow>
        <StyledRow>
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </StyledRow>
        <StyledButton onClick={this.resetGame}>RESET</StyledButton>
      </div>
    );
  }

  resetGame() {
    this.setState(this.InitialState);
  }
}

function checkWinner(squares) {
  const winnerLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < winnerLines.length; i++) {
    const [a, b, c] = winnerLines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
export default Board;
