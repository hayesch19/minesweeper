import React, { Component } from 'react'
import Header from './components/Header.jsx'
import GameBoard from './components/GameBoard.jsx'

class App extends Component {
  render() {
    return (
      <main className="app-area">
        <Header />
        <GameBoard />
      </main>
    )
  }
}

export default App
