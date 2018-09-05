import React from 'react'

import { shallow } from 'enzyme'
import { Cookies } from 'react-cookie'

import { Game } from '../components/game'

const cookiesProp = new Cookies()
const PASSWORD_LENGTH = 5

describe('<Game />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Game cookies={cookiesProp}/>)
  })

  it('renders <Game /> corretly', () => {
    expect(wrapper).toHaveLength(1)
  })

  it('generates a random password without repeated numbers', () => {
    const randomNumber = wrapper.instance().getRandomNumber()
    expect(wrapper.instance().checkRepeatedNumber(randomNumber)).toBeFalsy()
  })

  it(`generates a random password with the right length (${PASSWORD_LENGTH})`, () => {
    const randomNumber = wrapper.instance().getRandomNumber()
    expect(randomNumber.length).toBe(PASSWORD_LENGTH)
  })

  describe('Rules', () => {
    it('shows the Rules when first arriving on page', () => {
      expect(wrapper.find('Rules').length).toBe(1)
    })

    it('doesn\'t show rules on reload', () => {
      wrapper.setState({ openRules: false })
      expect(wrapper.find('Rules').length).toBe(0)
    })
  })

  describe('Errors', () => {
    it('does not allow repeated numbers', () => {
      const repeatedNumber = '11234'
      const result = wrapper.instance().checkRepeatedNumber(repeatedNumber)
      expect(result).toBeTruthy();
    })

    it('does not allow password length different than 5 numbers', () => {
      const lessNumbers = '1234'
      const moreNumbers = '123456'
      const result1 = wrapper.instance().checkNumberLength(lessNumbers)
      const result2 = wrapper.instance().checkNumberLength(moreNumbers)
      expect(result1).toBeTruthy();
      expect(result2).toBeTruthy();
    })
  })
})
