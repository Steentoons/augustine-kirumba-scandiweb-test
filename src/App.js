import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./assets/css/main.css";
import Homepage from "./pages/Homepage";
import ProductView from "./pages/ProductView";
import Cart from "./pages/Cart";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
});

class App extends Component {
  constructor() {
    super();

    this.state = {
      cartItems: [],
      cartCount: 0,
      totalPrice: 0,
      tax: 0,
      currencySymbol: [0, "$"]
    };

    // Binding Handlers...
    this.cartItemsHandler = this.cartItemsHandler.bind(this);
    this.cartCountPlusHandler = this.cartCountPlusHandler.bind(this);
    this.cartCountMinusHandler = this.cartCountMinusHandler.bind(this);
    this.quantityPlusHandler = this.quantityPlusHandler.bind(this);
    this.quantityMinusHandler = this.quantityMinusHandler.bind(this);
    this.navigateImageRight = this.navigateImageRight.bind(this);
    this.navigateImageLeft = this.navigateImageLeft.bind(this);
    this.currencyHandler = this.currencyHandler.bind(this)
    this.deleteItem = this.deleteItem.bind(this)
  }

  // HANDLERS...

  // Changing currency...
  currencyHandler(e) {
    const idx = Number(e.currentTarget.dataset.currindex);
    const currentCurrency = e.currentTarget.dataset.curr_currency
    let items = [...this.state.currencySymbol]
    items[0] = idx
    items[1] = currentCurrency
    this.setState({ currencySymbol: items });
  }


  // Adding items to the cart...
  cartItemsHandler(product) {
    console.log("Called")
    this.setState({ cartItems: [...this.state.cartItems, product] });
    const newTotal = ((this.state.totalPrice * 100) + (product.itemFixedPrice * 100))/100

    // Getting tax...
    const tax = ((newTotal * 100) * (21/100))/100

    this.setState({ totalPrice: newTotal });
    this.setState({ tax: Number(tax.toFixed(2))})
    console.log("Finished")
  }

  // Deleting items from the cart...
  deleteItem(idx) {
      let items = [...this.state.cartItems]

      for(let i = 0; i < items.length; i++) {
        if(i === idx) {
          items.splice(i, 1)
        }
      }

      this.setState({ cartItems: items})
  }
  

  // Adding individual item quantity to the cart...
  cartCountPlusHandler() {
    this.setState((prev) => {
      return { cartCount: prev.cartCount + 1 };
    });
  }

  // Reducing individual item quantity from the cart...
  cartCountMinusHandler() {
    this.setState((prev) => {
      return { cartCount: prev.cartCount - 1 };
    });
  }

  // Adding quantity to the cart...
  quantityPlusHandler(idx) {
    let items = [...this.state.cartItems];
    let item = { ...items[idx] };
    item.quantity = this.state.cartItems[idx].quantity + 1;
    item.itemTotalPrice = ((this.state.cartItems[idx].itemFixedPrice * 100) * item.quantity)/100
    items[idx] = item;

    this.setState({ cartItems: items });

    this.cartCountPlusHandler();
    const newTotal =
      ((this.state.totalPrice * 100) + (this.state.cartItems[idx].itemFixedPrice * 100))/100;
    
    // Getting tax...
    const tax = ((newTotal * 100) * (21/100))/100

    this.setState({ totalPrice: newTotal });
    this.setState({ tax: Number(tax.toFixed(2))})
  }

  // Reducing quantity from the cart...
  quantityMinusHandler(idx) {
    if (this.state.cartItems[idx].quantity > 0) {
      let items = [...this.state.cartItems];
      let item = { ...items[idx] };
      item.quantity = this.state.cartItems[idx].quantity - 1;
      item.itemTotalPrice = ((this.state.cartItems[idx].itemFixedPrice * 100) * item.quantity)/100
      items[idx] = item;

      this.setState({ cartItems: items });

      this.cartCountMinusHandler();
      const newTotal =
        ((this.state.totalPrice * 100) - (this.state.cartItems[idx].itemFixedPrice * 100))/100;

      // Getting tax...
      const tax = ((newTotal * 100) * (21/100))/100

      this.setState({ totalPrice: Number(newTotal.toFixed(2)) });
      this.setState({ tax: Number(tax.toFixed(2))})

      // Calling the delete item fn...
      if(item.quantity === 0) {
        this.deleteItem(idx)
      }
    }
  }

  // Navigate displayed image to the right...
  navigateImageRight(idx, length) {
    const currentIdx = this.state.cartItems[idx].currentImageIdx;
    console.log(`${idx} ${currentIdx} ${length}`);
    if (currentIdx !== length - 1) {
      let items = [...this.state.cartItems];
      let item = { ...items[idx] };
      item.currentImageIdx = currentIdx + 1;
      items[idx] = item;

      this.setState({ cartItems: items });
    }
  }

  // Navigate displayed image to the left...
  navigateImageLeft(idx, length) {
    const currentIdx = this.state.cartItems[idx].currentImageIdx;
    console.log(`${idx} ${currentIdx} ${length}`);
    if (currentIdx > 0) {
      let items = [...this.state.cartItems];
      let item = { ...items[idx] };
      item.currentImageIdx = currentIdx - 1;
      items[idx] = item;

      this.setState({ cartItems: items });
    }
  }

  render() {
    return (
      <Router>
        <ApolloProvider client={client}>
          <div className="container">
            <Switch>
              <Route exact path="/">
                <Homepage
                  cartItems={this.state.cartItems}
                  cartCount={this.state.cartCount}
                  quantityMinusHandler={this.quantityMinusHandler}
                  quantityPlusHandler={this.quantityPlusHandler}
                  navigateImageRight={this.navigateImageRight}
                  navigateImageLeft={this.navigateImageLeft}
                  totalPrice={this.state.totalPrice}
                  cartItemsHandler={this.cartItemsHandler}
                  cartCountPlusHandler={this.cartCountPlusHandler}
                  currencySymbol={this.state.currencySymbol}
                  currencyHandler={this.currencyHandler}
                />
              </Route>
              <Route
                exact
                path="/product/:id"
                render={(props) => (
                  <ProductView
                    {...props}
                    cartItemsHandler={this.cartItemsHandler}
                    cartItems={this.state.cartItems}
                    cartCount={this.state.cartCount}
                    cartCountPlusHandler={this.cartCountPlusHandler}
                    cartCountMinusHandler={this.cartCountMinusHandler}
                    quantityMinusHandler={this.quantityMinusHandler}
                    quantityPlusHandler={this.quantityPlusHandler}
                    totalPrice={this.state.totalPrice}
                    navigateImageRight={this.navigateImageRight}
                    navigateImageLeft={this.navigateImageLeft}
                    currencySymbol={this.state.currencySymbol}
                    currencyHandler={this.currencyHandler}
                  />
                )}
              />
              <Route
                exact
                path="/cart"
                render={(props) => (
                  <Cart
                    {...props}
                    cartItems={this.state.cartItems}
                    cartCount={this.state.cartCount}
                    quantityMinusHandler={this.quantityMinusHandler}
                    quantityPlusHandler={this.quantityPlusHandler}
                    totalPrice={this.state.totalPrice}
                    navigateImageRight={this.navigateImageRight}
                    navigateImageLeft={this.navigateImageLeft}
                    tax={this.state.tax}
                    currencySymbol={this.state.currencySymbol}
                    currencyHandler={this.currencyHandler}
                  />
                )}
              />
            </Switch>
          </div>
        </ApolloProvider>
      </Router>
    );
  }
}

export default App;
