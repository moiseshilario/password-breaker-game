import React from 'react'
import PropTypes from 'prop-types'

const Errors = ({ lengthError, repeatedError }) => (
  <div>
   {repeatedError && <p className="error">Cannot use repeated numbers!</p>}
   {lengthError && <p className="error">The password must have 5 numbers!</p>}
  </div>
)

Errors.propTypes = {
  lengthError: PropTypes.bool.isRequired,
  repeatedError: PropTypes.bool.isRequired,
}

export default Errors
