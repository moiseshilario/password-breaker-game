import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.scss'

import Game from './components/game.js'

ReactDOM.render(
  <Game />,
  document.getElementById('root')
)

module.hot.accept()
