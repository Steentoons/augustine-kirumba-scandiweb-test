import React from "react";
import { PureComponent } from "react";
import { Query } from "react-apollo";
import "../assets/css/bodySection.css";
import { product_query } from "../lib/queries";
import ProductContainer from "./ProductContainer";

export class BodySection extends PureComponent {
  constructor() {
    super();

    this.productQuery = this.productQuery.bind(this);
    this.printProducts = this.printProducts.bind(this);
    this.capitalizeFirstLetter = this.capitalizeFirstLetter.bind(this);
  }

  // The product query...
  productQuery( PRODUCT_QUERY, currencyIdx, cartItemsHandler, currencySymbol ) {
    const productQuery = (
      <Query query={PRODUCT_QUERY}>
        {({ loading, data }) => {
          if (loading) return null;
          const allProducts = this.printProducts( data, currencyIdx, cartItemsHandler, currencySymbol  )

          return allProducts;
        }}
      </Query>
    );

    return productQuery;
  }

  // Returns the product component...
  printProducts( data, currencyIdx, cartItemsHandler, currencySymbol ) {
    const allProducts = data.category.products.map((product, idx) => {
      return (
        <ProductContainer
          key={idx}
          product={product}
          currencyIdx={currencyIdx}
          cartItemsHandler={cartItemsHandler}
          currencySymbol={currencySymbol}
        />
      );
    });

    return allProducts
  }

  // Capitalizes the first letter of the category title...
  capitalizeFirstLetter( category ) {
    return category.charAt(0).toUpperCase() + category.slice(1)
  }

  render() {
    const { category, currencyIdx, cartItemsHandler, currencySymbol, match } =
      this.props;
    const PRODUCT_QUERY = product_query(match.params.category);

    return (
      <div className="body-section-wrapper">
        <div className="body-section-container">
          <div className="category-title">
            {this.capitalizeFirstLetter( category )}
          </div>
          <div className="product-list-wrapper">
            {this.productQuery( PRODUCT_QUERY, currencyIdx, cartItemsHandler, currencySymbol )}
          </div>
        </div>
      </div>
    );
  }
}

export default BodySection;
