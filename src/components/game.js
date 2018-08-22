import React from 'react'
import { instanceOf } from 'prop-types'

import { withCookies, Cookies } from 'react-cookie'

import { AttemptItem } from './attempt-item'
import Rules from './rules'

const PASSWORD_LENGTH = 5
const REPEATED_NUMBER_REGEX = /(\d)\d*\1/

class Game extends React.Component {
  constructor(props) {
    super(props)
    const { cookies } = props
    this.state = {
      attempts: [],
      /* eslint-disable no-unneeded-ternary */
      firstTime: localStorage.getItem('firstTime') === 'false' ? false : true,
      /* eslint-enable no-unneeded-ternary */
      lastScrollTop: 0,
      lengthError: false,
      openRules: false,
      password: this.getRandomNumber(),
      record: cookies.get('record') || '9999',
      repeatedError: false,
      showPassword: false,
      showRulesButton: true,
      win: false,
    }

    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.handleRuleButtonClick = this.handleRuleButtonClick.bind(this)
    this.handleScroll = this.handleScroll.bind(this)
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll() {
    const windowPosition = window.pageYOffset
    if (windowPosition > this.state.lastScrollTop) {
      this.setState({ showRulesButton: false })
    } else {
      this.setState({ showRulesButton: true })
    }
    this.setState({ lastScrollTop: windowPosition })
  }

  handleRuleButtonClick() {
    localStorage.setItem('firstTime', false)
    this.setState({
      firstTime: false,
      openRules: false,
    })
  }

  getRandomNumber() {
    let availableNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    const password = []
    let passwordString = ''

    for (let index = 0; index < PASSWORD_LENGTH; index++) {
      const randomIndex = Math.floor(Math.random() * availableNumbers.length)
      const chosenNumber = availableNumbers[randomIndex]
      password.push(chosenNumber)
      passwordString += chosenNumber
      availableNumbers = availableNumbers.filter(number => number !== chosenNumber)
    }

    return passwordString
  }

  handleNewPassword() {
    this.setState({
      password: this.getRandomNumber(),
      win: false,
      attempts: [],
      showPassword: false,
    })
    document.querySelector('.attempt__number').value = ''
  }

  checkPassword(numberString) {
    const numberArray = []
    const passwordArray = []
    for (let index = 0; index < PASSWORD_LENGTH; index++) {
      numberArray.push(numberString.charAt(index))
      passwordArray.push(this.state.password.charAt(index))
    }

    let close = 0
    let match = 0

    for (let index = 0; index < PASSWORD_LENGTH; index++) {
      const currentNumber = numberArray[index]
      if (currentNumber === passwordArray[index]) {
        match += 1
      } else {
        for (let index2 = 0; index2 < PASSWORD_LENGTH; index2++) {
          if (currentNumber === passwordArray[index2] && index !== index2) {
            close += 1
          }
        }
      }
    }

    const currentAttempt = {
      attemptNumber: this.state.attempts.length + 1,
      password: numberString,
      close,
      match,
    }

    this.setState({ attempts: [...this.state.attempts, currentAttempt] })

    if (match === PASSWORD_LENGTH) {
      this.setState({ win: true })

      const numberOfAttempts = currentAttempt.attemptNumber
      this.checkRecord(numberOfAttempts)
    }
  }

  checkRecord(numberOfAttempts) {
    if (numberOfAttempts < this.state.record) {
      const { cookies } = this.props
      cookies.set('record', numberOfAttempts)
      this.setState({
        record: numberOfAttempts,
        newRecord: true,
      })
    } else {
      this.setState({ newRecord: false })
    }
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

    if (number.match(REPEATED_NUMBER_REGEX)) {
      this.setState({ repeatedError: true })
      return false
    }
    this.setState({ repeatedError: false })

    return true
  }

  toggleShowPassword() {
    this.setState({ showPassword: !this.state.showPassword })
  }

  toggleShowRules() {
    this.setState({ openRules: !this.state.openRules })
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      this.handleNewAttempt()
    }
  }

  render() {
    const {
      win,
      password,
      attempts,
      repeatedError,
      lengthError,
      showPassword,
      firstTime,
      openRules,
      showRulesButton,
      record,
      newRecord,
    } = this.state
    return (
      <div className="game">
        {(firstTime || openRules) && <Rules onClick={this.handleRuleButtonClick}/>}
        <div className="game__content">
          <h1 className="game__title">Password Breaker</h1>
          <div className={win || firstTime || openRules ? 'game__overlay' : 'hide'} />
          <div className={showRulesButton ? 'help' : 'help help--hidden'}
            onClick={() => this.toggleShowRules()}>?
          </div>
          <div className={win ? 'game__win' : 'hide'}>
            <h2 className="game__win__text">Congratulations!</h2>
            <h3 className="game__win__subtext">You hacked the password</h3>
            <div className="game__win__status"></div>
            {newRecord && <p className="new-record">NEW RECORD!!!</p>}
            <p className="total-attempts">Total attempts: { attempts.length }</p>
            <p className="best-record">Best record</p>
            <p className="record-number">{ record }</p>
            <button className="button pw-container__button"
              onClick={() => this.handleNewPassword()}
            >
              Generate new Password
            </button>
          </div>
          <div className="pw-container">
            <div
              className={showPassword || win ? 'hide' : 'lock'}
              // onClick={() => this.toggleShowPassword()}
            >
            </div>
            <h2 className="pw-container__password"
              onClick={() => this.toggleShowPassword()}
            >{password}</h2>
          </div>
          <div className="attempt">
            <input type="number" className="attempt__number" onKeyPress={this.handleKeyPress}/>
            {repeatedError && <p className="error">Cannot use repeated numbers!</p>}
            {lengthError && <p className="error">The password needs to be 5 numbers!</p>}
            <button onClick={() => this.handleNewAttempt()} className="button attempt__button">Hack</button>
            <ul className="attempt__list">
              {
                attempts.map((attempt, index) => (
                  <AttemptItem key={index}
                    attemptNumber={attempt.attemptNumber}
                    password={attempt.password}
                    close={attempt.close}
                    match={attempt.match}
                  />
                ))
              }
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

Game.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
}

export default withCookies(Game)
