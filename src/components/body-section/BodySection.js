import React from "react";
import { PureComponent } from "react";
import "../../assets/css/bodySection.css";
import { product_query } from "../../lib/queries";

export class BodySection extends PureComponent {
  render() {
    const { category, currencyIdx, cartItemsHandler, currencySymbol, capitalizeFirstLetter, productQuery, match } =
      this.props;
    const PRODUCT_QUERY = product_query(match.params.category);

    return (
      <div className="body-section-wrapper">
        <div className="body-section-container">
          <div className="category-title">
            {capitalizeFirstLetter(category)}
          </div>
          <div className="product-list-wrapper">
            {productQuery(
              PRODUCT_QUERY,
              currencyIdx,
              cartItemsHandler,
              currencySymbol
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default BodySection;
