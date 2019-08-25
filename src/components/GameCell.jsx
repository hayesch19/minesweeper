import React, { Component } from 'react'

export class GameCell extends Component {
  render() {
    return (
      <td
        className="game-cell"
        onClick={this.props.leftHandClick}
        onContextMenu={this.props.rightHandClick}
      >
        {this.props.display}
      </td>
    )
  }
}

export default GameCell
