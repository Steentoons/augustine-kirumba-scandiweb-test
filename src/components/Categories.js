import React, { Component } from 'react'

export default class Categories extends Component {
  render() {
    const categoryStyle = {
      color: this.props.category.toLowerCase() === this.props.categoryState ? "#5ECE7B" : "#1D1F22",
      borderBottom: this.props.category.toLowerCase() === this.props.categoryState ? "solid #5ECE7B 2px" : "none"
    }
    return (
      <li style={categoryStyle} onClick={() => this.props.changeCategory(this.props.category.toLowerCase())}>
        {this.props.category}
      </li>
    )
  }
}
