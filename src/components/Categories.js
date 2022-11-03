import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'

export default class Categories extends PureComponent {
  render() {

    const {
      category,
      categoryState,
      changeCategory,
    } = this.props

    const categoryStyle = {
      color: category.toLowerCase() === categoryState ? "#5ECE7B" : "#1D1F22",
      borderBottom: category.toLowerCase() === categoryState ? "solid #5ECE7B 2px" : "none"
    }
    return (
      <li style={categoryStyle} >
        <Link onClick={() => changeCategory(category.toLowerCase())} to={`/category/${category.toLowerCase()}`}>{category}</Link>
      </li>
    )
  }
}
