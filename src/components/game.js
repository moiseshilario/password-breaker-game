import React, { Component } from 'react'

// import { Attempt } from './attempt'
// import Numbers from './numbers'

const passwordLength = 5
const repeatedNumberRegex = /(\d)\d*\1/

export default class Game extends Component {
  constructor() {
    super()
    this.state = {
      password: this.getRandomNumber(),
      attempts: [],
      lengthError: false,
      repeatedError: false
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
      passwordString += chosenNumber
      availableNumbers = availableNumbers.filter(number => number !== chosenNumber)
    }

    return passwordString
  }

  handleNewPassword() {
    this.setState({ password: this.getRandomNumber() })
  }

  checkPassword(numberString) {
    const numberArray = []
    const passwordArray = []
    for (let index = 0; index < passwordLength; index++) {
      numberArray.push(numberString.charAt(index))
      passwordArray.push(this.state.password.charAt(index))
    }

    let close = 0
    let match = 0

    for (let index = 0; index < passwordLength; index++) {
      const currentNumber = numberArray[index]
      if (currentNumber === passwordArray[index]) {
        match += 1
      } else {
        for (let index2 = 0; index2 < passwordLength; index2++) {
          if (currentNumber === passwordArray[index2] && index !== index2) {
            close += 1
          }
        }
      }
    }

    const currentAttempt = {
      attemptNumber: numberString,
      close,
      match
    }

    this.setState({
      attempts: [...this.state.attempts, currentAttempt]
    })

    this.createAttempt()
  }

  handleNewAttempt() {
    const inputValue = document.querySelector('.attempt__number').value
    if (!this.validateAttempt(inputValue)) {
      return
    }

    this.checkPassword(inputValue)
  }

  validateAttempt(number) {
    if (number.length !== 5) {
      this.setState({ lengthError: true })
      return false
    }
    this.setState({ lengthError: false })

    if (number.match(repeatedNumberRegex)) {
      this.setState({ repeatedError: true })
      return false
    }
    this.setState({ repeatedError: false })

    return true
  }

  render() {
    const { password, repeatedError, lengthError } = this.state
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
          <div className='attempt'>
            <input type="number" className="attempt__number"/>
            { repeatedError ? <p>Cannot use repeated numbers!</p> : '' }
            { lengthError ? <p>The password needs to be 5 numbers!</p> : ''}
            <button onClick={() => this.handleNewAttempt()} className='button attempt__button'>Hack</button>
          </div>
        </div>
      </div>
    )
  }
}
