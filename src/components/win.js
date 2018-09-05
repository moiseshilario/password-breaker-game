import React from 'react'
import PropTypes from 'prop-types'

const Win = ({
  attempts,
  onClick,
  newRecord,
  record,
  win,
}) => (
  <div className={win ? 'game__win' : 'hide'}>
    <h2 className="game__win__text">Congratulations!</h2>
    <h3 className="game__win__subtext">You hacked the password</h3>
    <div className="game__win__status"></div>
    {newRecord && <p className="new-record">NEW RECORD!!!</p>}
    <p className="total-attempts">Total attempts: { attempts }</p>
    <p className="best-record">Best record</p>
    <p className="record-number">{ record }</p>
    <button className="button pw-container__button"
      onClick={() => onClick()}
    >
      Generate new Password
    </button>
  </div>
)

Win.propTypes = {
  attempts: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  newRecord: PropTypes.bool.isRequired,
  record: PropTypes.string.isRequired,
  win: PropTypes.bool.isRequired,
}

export default Win
