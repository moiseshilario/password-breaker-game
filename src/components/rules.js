import React from 'react'
import PropTypes from 'prop-types'

export const Rules = ({ onClick }) => (
  <div className='rules'>
    <h1 className='rules__title'>Rules</h1>
    <div className='rules__objective'>
      <h3>Objective</h3>
      <p>Guess all the 5 digits of the password</p>
    </div>
    <ul>
      <li className='rules__item'>The password contains 5 non repeated numbers</li>
      <li className='rules__item'>A <span className='rules__close'>"Close"</span> means that the password contains the number, but it is <span className='rules__attention'>NOT</span> in the right position</li>
      <li className='rules__item'>A <span className='rules__match'>"Match"</span> means that the password contains the number, and it IS in the right position</li>
    </ul>
    <button className='button'
      onClick={ () => onClick() }>Got it!</button>
  </div>
)

Rules.propTypes = {
  onClick: PropTypes.func.isRequired
}
