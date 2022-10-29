import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import ProductContent from "../components/ProductContent";
import Header from "../components/Header";

export default class ProductView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentId: this.props.match.params.id,
    };
  }
  render() {
    // Product view query...
    const PRODUCT_VIEW_QUERY = gql`
    {
      product(id: "${this.state.currentId}") {
        name
        inStock
        gallery
        description
        brand
        inStock
        prices {
          amount
          currency {
            symbol
          }
        }
        attributes {
          name
          type
          items {
            displayValue
            value
          }
        }
      }
    }
    `;
    return (
      <div>
        <Header
          cartItems={this.props.cartItems}
          cartCount={this.props.cartCount}
          quantityMinusHandler={this.props.quantityMinusHandler}
          quantityPlusHandler={this.props.quantityPlusHandler}
          totalPrice={this.props.totalPrice}
          navigateImageRight={this.props.navigateImageRight}
          navigateImageLeft={this.props.navigateImageLeft}
          currencySymbol={this.props.currencySymbol}
          currencyHandler={this.props.currencyHandler}
          checkout={this.props.checkout}
          changeCategory={this.props.changeCategory}
          calculateCurrencyHandler={this.props.calculateCurrencyHandler}
          getTotalHandler={this.props.getTotalHandler}
          setTotalHandler={this.props.setTotalHandler}
        />

        <Query query={PRODUCT_VIEW_QUERY}>
          {({ loading, data }) => {
            let result = null;
            if (!loading) {
              const currentProduct = data.product;
              const currentProjectComponent = (
                <ProductContent
                  history={this.props.history}
                  currentProduct={currentProduct}
                  currentId={this.state.currentId}
                  cartItemsHandler={this.props.cartItemsHandler}
                  cartItems={this.props.cartItems}
                  cartCount={this.props.cartCount}
                  cartCountPlusHandler={this.props.cartCountPlusHandler}
                  cartCountMinusHandler={this.props.cartCountMinusHandler}
                  currencySymbol={this.props.currencySymbol}
                  quantityPlusHandler={this.props.quantityPlusHandler}
                />
              );

              result = currentProjectComponent;
            } else return null

            return result;
          }}
        </Query>
      </div>
    );
  }
}
