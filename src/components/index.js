import React from 'react'
import { CookiesProvider } from 'react-cookie'

import Game from './game'

export default function Root() {
  return (
    <CookiesProvider>
      <Game />
    </CookiesProvider>
  )
}
