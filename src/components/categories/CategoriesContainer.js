import React, { PureComponent } from "react";
import Categories from "./Categories";

export class CategoriesContainer extends PureComponent {
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

    return (
      <Categories
        category={category}
        changeCategory={changeCategory}
        categoryState={categoryState}
        categoryStyle={this.categoryStyle}
        categoryToLowercase={this.categoryToLowercase}
      />
    );
  }
}

export default CategoriesContainer;
