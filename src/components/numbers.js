import React, { Component } from 'react'

export default class Numbers extends Component {
  constructor() {
    super()
    this.state = {
      active: [true, true, true, true, true, true, true, true, true]
    }
  }

  handleClick(index) {
    const activeArray = this.state.active
    activeArray[index] = !this.state.active[index]

    this.setState({ active: activeArray })
  }

  renderListItems() {
    let listItems = []

    for (let index = 0; index <= 9; index++) {
      listItems = [...listItems,
        <li
          key={index}
          className={this.state.active[index] ? 'number' : 'number disabled'}
          onClick={() => this.handleClick(index)}
        >{index}</li>
      ]
    }

    return listItems
  }

  render() {
    return (
      <ul className='numbers-container'>{this.renderListItems()}</ul>
    )
  }
}
