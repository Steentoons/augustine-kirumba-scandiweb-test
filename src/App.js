
import React, { Component } from "react";
import ApolloClient  from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"

import "./assets/css/main.css"
import Homepage from "./pages/Homepage";
import ProductView from "./pages/ProductView";
import Cart from "./pages/Cart";


const client = new ApolloClient({
  uri: "http://localhost:4000/",
});

class App extends Component {
  constructor() {
    super()

    this.state = {
      cartItems: [], 
      cartCount: 0
    }

    this.cartItemsHandler = this.cartItemsHandler.bind(this)
    this.cartCountHandler = this.cartCountHandler.bind(this)
  }

  cartItemsHandler(product) {

    this.setState({cartItems: [...this.state.cartItems, product]})
  }

  cartCountHandler() {
    this.setState(prev => {
      return ({cartCount: prev.cartCount + 1})
    })
  }

  // navigate(history, attributes, productId, cartItems) {
  //   history.push('/cart', {cartItems: [ ...cartItems, {attributes, productId, quantity: 0}], cartCount: this.state.cartCount})
  // }
  render() {
    return (
      <Router>
      <ApolloProvider client={client}>
        <div className="container">
          <Switch>
              <Route exact path="/"><Homepage cartItems={this.state.cartItems} cartCount={this.state.cartCount} /></Route>
              <Route exact path="/product/:id" render={(props) => <ProductView {...props} cartItemsHandler={this.cartItemsHandler} cartItems={this.state.cartItems} cartCount={this.state.cartCount} cartCountHandler={this.cartCountHandler} /> }
              />
              <Route exact path="/cart" render={(props) => <Cart {...props} cartItems={this.state.cartItems} cartCount={this.state.cartCount} /> }
              />
          </Switch>
        </div>
      </ApolloProvider> 
      </Router>
    );
  }
}

export default App;
