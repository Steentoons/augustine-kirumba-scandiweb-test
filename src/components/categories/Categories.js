import React, { PureComponent } from "react";
import { Link } from "react-router-dom";

export default class Categories extends PureComponent {
  constructor() {
    super();

    this.categoryToLowercase = this.categoryToLowercase.bind(this);
    this.categoryStyle = this.categoryStyle.bind(this);
  }
  categoryToLowercase(category) {
    return category.toLowerCase();
  }

  categoryStyle(categoryState, category) {
    const categoryStyle = {
      color:
        this.categoryToLowercase(category) === categoryState
          ? "#5ECE7B"
          : "#1D1F22",
      borderBottom:
        this.categoryToLowercase(category) === categoryState
          ? "solid #5ECE7B 2px"
          : "none",
    };

    return categoryStyle;
  }
  render() {
    const { category, categoryState, changeCategory } = this.props;
    const categoryStyle = this.categoryStyle(categoryState, category);

    return (
      <li style={categoryStyle}>
        <Link
          onClick={() => changeCategory(this.categoryToLowercase(category))}
          to={`/category/${this.categoryToLowercase(category)}`}
        >
          {category}
        </Link>
      </li>
    );
  }
}
