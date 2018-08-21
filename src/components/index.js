import React from 'react'
import Game from './game'
import { CookiesProvider } from 'react-cookie'

export default function Root() {
  return (
    <CookiesProvider>
      <Game />
    </CookiesProvider>
  )
}
