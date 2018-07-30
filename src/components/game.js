import React, { Component } from 'react'
import Numbers from './numbers'

const passwordLength = 5
const repeatedNumberRegex = /(\d)\d*\1/

export default class Game extends Component {
  constructor() {
    super()
    this.state = {
      password: this.getRandomNumber(),
      attempts: [],
      lengthError: false,
      repeatedError: false,
      inputValue: ''
    }
  }

  getRandomNumber() {
    let availableNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    const password = []
    let passwordString = ''

    for (let index = 0; index < passwordLength; index++) {
      const randomIndex = Math.floor(Math.random() * availableNumbers.length)
      const chosenNumber = availableNumbers[randomIndex]
      password.push(chosenNumber)
      passwordString += chosenNumber;
      availableNumbers = availableNumbers.filter(number => number !== chosenNumber)
    }

    return passwordString
  }

  handleNewPassword() {
    this.setState({ password: this.getRandomNumber() })
  }

  handleNewAttempt() {

    
  }

  validateAttempt(number) {
    if(number.length < 5) {
      this.setState({ lengthError: true })
      return false;
    }

    return true;
  }

  renderAttempt() {
    <li>
      <input type='number'/>
    </li>
  }

  render() {
    const { password,inputValue, repeatedError } = this.state
    return (
      <div className='game'>
        <h1 className='game__title'>Password Breaker</h1>
        <div className='game__content'>
          <div className='pw-container'>
            <h2 className='pw-container__password'>{password}</h2>
            <button className='button pw-container__button'
            onClick={() => this.handleNewPassword()}
            >
              Generate new Password
            </button>
          </div>
          <ul>{this.renderAttempt()}</ul>
          <div className='attempt'>
            <h2 className="attempt__number">{}</h2>
            {<Numbers />}
            <button onClick={() => this.handleNewAttempt()} className='button attempt__button'>Hack</button>
          </div>
        </div>
      </div>
    )
  }
}