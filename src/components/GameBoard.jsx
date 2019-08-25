import React, { Component } from 'react'
import Axios from 'axios'
import GameCell from './GameCell.jsx'

export class GameBoard extends Component {
  state = {
    board: [],
    mines: [],
    currState: '',
    id: 0
  }

  // Minesweeper API: ('https://minesweeper-api.herokuapp.com/')
  // New Game API
  newGameApi = async minesweeperData => {
    const resp = await Axios.post(`http://minesweeper-api.herokuapp.com/games`)
    this.setState({
      board: resp.data.board,
      currState: resp.data.state,
      mines: resp.data.mines,
      id: resp.data.id
    })
    console.log('New Game')
    console.log(resp)
  }
  componentDidMount() {
    this.newGameApi()
  }

  // Left Click Event: Select Game Cell
  selectCellApi = async (x, y) => {
    const resp = await Axios.post(
      `http://minesweeper-api.herokuapp.com/games/${this.state.id}/check`,
      {
        row: x,
        col: y
      }
    )
    this.setState({
      board: resp.data.board
    })
    console.log(resp)
  }
  cellLeftClick = (x, y) => {
    console.log('clicked', x, y)
    this.selectCellApi(x, y)
  }

  // Right Click Event Place Flag
  placeFlagApi = async (x, y) => {
    const resp = await Axios.post(
      `http://minesweeper-api.herokuapp.com/games/${this.state.id}/flag`,
      {
        row: x,
        col: y
      }
    )
    this.setState({
      board: resp.data.board
    })
    console.log(resp)
  }
  cellRightClick = (x, y) => {
    console.log('right clicked', x, y)
    this.placeFlagApi(x, y)
  }

  render() {
    return (
      <>
        <section className="game-area">
          <table className="board">
            <tbody>
              {this.state.board.map((col, i) => {
                return (
                  <tr key={i}>
                    {col.map((row, j) => {
                      return (
                        <GameCell
                          key={j}
                          display={this.state.board[i][j]}
                          leftHandClick={() => this.cellLeftClick(i, j)}
                          rightHandClick={() => this.placeFlagApi(i, j)}
                        />
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
          <section className="reset-game">
            <button onClick={this.newGameApi}>New Game</button>
          </section>
        </section>
      </>
    )
  }
}

export default GameBoard
