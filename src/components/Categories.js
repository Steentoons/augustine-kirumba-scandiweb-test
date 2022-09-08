import React, { Component } from 'react'

export default class Categories extends Component {
    // constructor() {
    //     this.changeCategoryFn = this.changeCategoryFn.bind(this)
    // }

    // changeCategoryFn() {

    // }
  render() {
    return (
      <li onClick={() => this.props.changeCategory(this.props.category.toLowerCase())}>
        {this.props.category}
      </li>
    )
  }
}
