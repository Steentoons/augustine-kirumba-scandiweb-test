import React from "react";
import { PureComponent } from "react";
import { Query } from "react-apollo";
import "../assets/css/bodySection.css";
import { product_query } from "../lib/queries";
import ProductContainer from "./ProductContainer";

export class BodySection extends PureComponent {
  render() {
    const {
      category,
      currencyIdx,
      cartItemsHandler,
      currencySymbol,
      match,
    } = this.props;

    const PRODUCT_QUERY = product_query( match.params.category );

    return (
      <div className="body-section-wrapper">
        <div className="body-section-container">
          <div className="category-title">
            { category.charAt(0).toUpperCase() + category.slice(1) }
          </div>
          <div className="product-list-wrapper">
            <Query
              query={ PRODUCT_QUERY }
            >
              {({ loading, data }) => {
                if ( loading ) return null;

                const allProducts = data.category.products.map(
                  ( product, idx ) => {
                    return (
                      <ProductContainer
                        key={ idx }
                        product={ product }
                        currencyIdx={ currencyIdx }
                        cartItemsHandler={ cartItemsHandler }
                        currencySymbol={ currencySymbol }
                      />
                    );
                  }
                );

                return allProducts;
              }}
            </Query>
          </div>
        </div>
      </div>
    );
  }
}

export default BodySection;
