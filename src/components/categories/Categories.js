import React, { PureComponent } from "react";
import { Link } from "react-router-dom";

export default class Categories extends PureComponent {
  render() {
    const {
      category,
      categoryState,
      changeCategory,
      categoryStyle,
      categoryToLowercase,
    } = this.props;

    return (
      <li style={categoryStyle(categoryState, category)}>
        <Link
          onClick={() => changeCategory(categoryToLowercase(category))}
          to={`/category/${categoryToLowercase(category)}`}
        >
          {category}
        </Link>
      </li>
    );
  }
}
