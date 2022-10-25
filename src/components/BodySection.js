import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import "../assets/css/bodySection.css";
import Product from "./Product";

// PRODUCT_QUERY =

export default class BodySection extends Component {
  render() {
    const PRODUCT_QUERY = gql`
    {
      category(input: {title: "${this.props.match.params.category}"}) {
        products {
          id
          name
          gallery
          inStock
          prices {
            currency {
              symbol
            }
            amount
          }
          attributes {
            name
          }
          brand
        }
      }
    }
    `;

    return (
      <div className="body-section-wrapper">
        <div className="body-section-container">
          <div className="category-title">
            {this.props.category.charAt(0).toUpperCase() +
              this.props.category.slice(1)}
          </div>
          <div className="product-list-wrapper">
            <Query query={PRODUCT_QUERY}>
              {({ loading, data }) => {
                if (loading) return null;

                const allProducts = data.category.products.map(
                  (product, idx) => {
                    return (
                      <Product
                        key={idx}
                        product={product}
                        currencyIdx={this.props.currencyIdx}
                        cartItemsHandler={this.props.cartItemsHandler}
                        cartCountPlusHandler={this.props.cartCountPlusHandler}
                        currencySymbol={this.props.currencySymbol}
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
