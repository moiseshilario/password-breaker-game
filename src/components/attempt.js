import React from 'react'
import PropTypes from 'prop-types'

export const Attempt = ({ attemptNumber, password, close, match }) => (
  <li className="attempt__item">
    <span className="attempt__item__number">{attemptNumber}</span>
    <h3 className="attempt__item__password">{password}</h3>
    <div className="attempt__item__report">
      <p className="report__close">{ close }</p>
      <p className="report__match">{ match }</p>
    </div>
  </li>
)

Attempt.propTypes = {
  attemptNumber: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  close: PropTypes.string.isRequired,
  match: PropTypes.string.isRequired
}
