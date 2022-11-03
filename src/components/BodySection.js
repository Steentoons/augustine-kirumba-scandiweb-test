import { gql } from "apollo-boost";
import React, { Component } from "react";
import { Query } from "react-apollo";
import "../assets/css/bodySection.css";
import { product_query } from "../lib/queries";
import ProductContainer from "./ProductContainer";

export class BodySection extends Component {
  render() {
    const {
      category,
      currencyIdx,
      cartItemsHandler,
      cartCountPlusHandler,
      currencySymbol,
      match,
      // PRODUCT_QUERY
    } = this.props;

    const PRODUCT_QUERY = product_query(match.params.category)

    console.log(match.params.category)

  //   const PRODUCT_QUERY = gql `
  //   {
  //     category(input: {title: "${match.params.category}"}) {
  //       products {
  //         id
  //         name
  //         gallery
  //         inStock
  //         prices {
  //           currency {
  //             symbol
  //           }
  //           amount
  //         }
  //         attributes {
  //           name
  //         }
  //         brand
  //       }
  //     }
  //   }
  // `;

    return (
      <div className="body-section-wrapper">
        <div className="body-section-container">
          <div className="category-title">
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </div>
          <div className="product-list-wrapper">
            <Query
              query={PRODUCT_QUERY}
              // variables={{ input: { title: match.params.category } }}
            >
              {({ loading, data }) => {
                if (loading) return null;

                const allProducts = data.category.products.map(
                  (product, idx) => {
                    return (
                      <ProductContainer
                        key={idx}
                        product={product}
                        currencyIdx={currencyIdx}
                        cartItemsHandler={cartItemsHandler}
                        cartCountPlusHandler={cartCountPlusHandler}
                        currencySymbol={currencySymbol}
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
