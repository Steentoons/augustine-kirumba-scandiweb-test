import React, { PureComponent } from "react";
import Categories from "./Categories";

export class CategoriesContainer extends PureComponent {
  render() {
    const { category, categoryState, changeCategory } = this.props;

    return (
      <Categories
        category={category}
        changeCategory={changeCategory}
        categoryState={categoryState}
      />
    );
  }
}

export default CategoriesContainer;
