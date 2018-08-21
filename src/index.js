import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.scss'

import Root from './components/index.js'

ReactDOM.render(
  <Root />,
  document.getElementById('root')
)

module.hot.accept()
