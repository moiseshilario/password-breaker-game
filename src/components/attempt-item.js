import React from 'react'
import PropTypes from 'prop-types'

export const AttemptItem = ({ attemptNumber, password, close, match }) => (
  <li className="attempt__item">
    <span className="attempt__item__number">{attemptNumber}</span>
    <h3 className="attempt__item__password">{password}</h3>
    <div className="attempt__item__report">
      <p className="report__close">Close: { close }</p>
      <p className="report__match">Match: { match }</p>
    </div>
  </li>
)

AttemptItem.propTypes = {
  attemptNumber: PropTypes.number.isRequired,
  password: PropTypes.string.isRequired,
  close: PropTypes.number.isRequired,
  match: PropTypes.number.isRequired
}
