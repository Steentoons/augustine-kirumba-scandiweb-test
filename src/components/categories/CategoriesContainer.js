import React, { PureComponent } from "react";
import { DARK_BLUE, GREEN, GREEN_BORDER, NONE } from "../../lib/constants";
import Categories from "./Categories";

export class CategoriesContainer extends PureComponent {
  categoryToLowercase = (category) => {
    return category.toLowerCase();
  }

  categoryStyle = (categoryState, category) => {
    const categoryStyle = {
      color:
        this.categoryToLowercase(category) === categoryState
          ? GREEN
          : DARK_BLUE,
      borderBottom:
        this.categoryToLowercase(category) === categoryState
          ? GREEN_BORDER
          : NONE,
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
