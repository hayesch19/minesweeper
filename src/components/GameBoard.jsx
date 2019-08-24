import React, { Component } from 'react'
import Axios from 'axios'
import GameCell from './GameCell.jsx'

export class GameBoard extends Component {
  state = {
    board: [],
    difficulty: 0,
    id: 0
  }

  // Minesweeper API: ('https://minesweeper-api.herokuapp.com/')
  // New Game API
  newGameApi = async minesweeperData => {
    const resp = await Axios.post(`http://minesweeper-api.herokuapp.com/games`)
    this.setState({
      board: resp.data.board,
      id: resp.data.id
    })
    console.log(resp)
  }
  componentDidMount() {
    this.newGameApi()
  }

  render() {
    return (
      <>
        <table className="board">
          <tbody>
            {this.state.board.map((col, i) => {
              return (
                <tr key={i}>
                  {col.map((row, j) => {
                    return <GameCell key={j} display={this.state.board[i][j]} />
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </>
    )
  }
}

export default GameBoard
