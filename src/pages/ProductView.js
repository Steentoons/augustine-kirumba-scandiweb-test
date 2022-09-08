import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import ProductContent from "../components/ProductContent";
import Header from "../components/Header";

export default class ProductView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentId: this.props.match.params.id
    }
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
    `
    return (
      <div>
        <Header />

        <Query query={PRODUCT_VIEW_QUERY}>
          {({ loading, data }) => {
            let result = null
            if(!loading) {
              const currentProduct = data.product
              const currentProjectComponent =  <ProductContent history={this.props.history} currentProduct={currentProduct} currentId={this.state.currentId} cartItemsHandler={this.props.cartItemsHandler} cartItems={this.props.cartItems} cartCount={this.props.cartCount} cartCountHandler={this.props.cartCountHandler} />

              result = currentProjectComponent
            }

            return result
          }}
        </Query>

      </div>
    );
  }
}
