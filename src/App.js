import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import _ from 'lodash'

import "./assets/css/main.css";
import Homepage from "./pages/Homepage";
import ProductView from "./pages/ProductView";
import CartContainer from "./pages/CartContainer";

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
      currencySymbol: [0, "$"],
      category: "all",
    };

    // Binding Handlers...
    this.cartItemsHandler = this.cartItemsHandler.bind(this);
    this.cartCountPlusHandler = this.cartCountPlusHandler.bind(this);
    this.cartCountMinusHandler = this.cartCountMinusHandler.bind(this);
    this.quantityPlusHandler = this.quantityPlusHandler.bind(this);
    this.quantityMinusHandler = this.quantityMinusHandler.bind(this);
    this.navigateImageRight = this.navigateImageRight.bind(this);
    this.navigateImageLeft = this.navigateImageLeft.bind(this);
    this.currencyHandler = this.currencyHandler.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.checkout = this.checkout.bind(this);
    this.changeCategory = this.changeCategory.bind(this);
    this.calculateCurrencyHandler = this.calculateCurrencyHandler.bind(this)
    this.updateItemPrice = this.updateItemPrice.bind(this)
    this.getTotalHandler = this.getTotalHandler.bind(this)
    this.setTotalHandler = this.setTotalHandler.bind(this)
  }

  componentDidMount() {
    const oldState = JSON.parse(sessionStorage.getItem("oldState"));
    const oldCartItems = JSON.parse(sessionStorage.getItem("oldCartItems"));
    if (oldState) {
      const { cartCount, totalPrice, tax, currencySymbol } = oldState;

      this.setState({
        cartCount,
        totalPrice,
        tax,
        currencySymbol: JSON.parse(currencySymbol),
      });
    }
    if (oldCartItems) {
      const { cartItems } = oldCartItems;
      const items = JSON.parse(cartItems);

      this.setState({ cartItems: items });
    }
  }

  componentDidUpdate(prevState) {
    const { cartCount, totalPrice, tax, currencySymbol } = this.state;
    const { cartItems } = this.state;
    
    if(
      cartCount !== prevState.cartCount ||
      totalPrice !== prevState.totalPrice ||
      tax !== prevState.tax ||
      !(_.isEqual(currencySymbol, prevState.currencySymbol))
    ) {
      sessionStorage.setItem(
        "oldState",
        JSON.stringify({
          cartCount,
          totalPrice,
          tax,
          currencySymbol: JSON.stringify(currencySymbol),
        })
      );
    }

    if(!(_.isEqual(cartItems, prevState.cartItems))) {
      sessionStorage.setItem(
        "oldCartItems",
        JSON.stringify({ cartItems: JSON.stringify(cartItems) })
      );
    }
  }

  // HANDLERS...

  // Changing category...
  changeCategory(currentCategory) {
    this.setState({ category: currentCategory });
  }

  // Updating total price of an item in the main state...
  updateItemPrice() {
    let items = this.state.cartItems
    // this.state.cartItems.map((item, idx) => {
    //   item.itemTotalPrice = 
    // })
  }

  // Changing currency...
  currencyHandler(e) {
    const idx = Number(e.currentTarget.dataset.currindex);
    const currentCurrency = e.currentTarget.dataset.curr_currency;
    let items = [...this.state.currencySymbol];
    items[0] = idx;
    items[1] = currentCurrency;
    this.setState({ currencySymbol: items });

    this.updateItemPrice()
  }

  // Calculating currency...
  calculateCurrencyHandler(e) {
    const idx = Number(e.currentTarget.dataset.currindex);
    const currentCurrency = e.currentTarget.dataset.curr_currency;
  }

  // Adding items to the cart...
  cartItemsHandler(product) {
    const{ currencySymbol } = this.state
    const currentCartItems = this.state.cartItems
    const newItems = [].concat(currentCartItems, product)
    this.setState({ cartItems: JSON.parse(JSON.stringify(newItems)) });
    const newTotal =
      (this.state.totalPrice * 100 + product.itemFixedPrice[currencySymbol[0]].amount * 100) / 100;

    // Getting tax...
    const tax = (newTotal * 100 * (21 / 100)) / 100;

    this.setState({ totalPrice: newTotal });
    this.setState({ tax: Number(tax.toFixed(2)) });

    this.cartCountPlusHandler()
  }

  // Calculating the grand total after currency change... 
  getTotalHandler(fixedAmount, quantity, grandTotal, idx) {
    const{ currencySymbol } = this.state
    let items = [...this.state.cartItems];
    let item = { ...items[idx] };
    item.itemFixedPrice[currencySymbol[0]].amount = fixedAmount
    items[idx] = item;
    this.setState({ cartItems: items })

    const itemPrice = (fixedAmount * quantity * 100)/100

    grandTotal = ((grandTotal * 100) + (itemPrice * 100))/100

    return grandTotal
  }

  // Setting the total to state after currency change...
  setTotalHandler(grandTotal) {
    this.setState({ totalPrice: grandTotal })
  }

  // Deleting items from the cart...
  deleteItem(idx) {
    let items = [...this.state.cartItems];

    for (let i = 0; i < items.length; i++) {
      if (i === idx) {
        items.splice(i, 1);
      }
    }

    this.setState({ cartItems: items });
  }

  // Ordering and clearing cart...
  checkout() {
    this.setState({ cartItems: [], cartCount: 0, totalPrice: 0, tax: 0 });
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

  itemTotalHandler(symbol, price, quantity, id) {
    return (
      `${symbol}${(price * 100 * quantity)/100}`
    )
  }

  // Adding quantity to the cart...
  quantityPlusHandler(idx) {
    const{ currencySymbol } = this.state
    let items = [...this.state.cartItems];
    let item = { ...items[idx] };
    item.quantity = this.state.cartItems[idx].quantity + 1;
    item.itemTotalPrice =
      (this.state.cartItems[idx].itemFixedPrice[currencySymbol[0]].amount * 100 * item.quantity) / 100;
    items[idx] = item;

    this.setState({ cartItems: items });

    this.cartCountPlusHandler();
    const newTotal =
      (this.state.totalPrice * 100 +
        this.state.cartItems[idx].itemFixedPrice[currencySymbol[0]].amount * 100) /
      100;

    // Getting tax...
    const tax = (newTotal * 100 * (21 / 100)) / 100;

    this.setState({ totalPrice: newTotal });
    this.setState({ tax: Number(tax.toFixed(2)) });
  }

  // Reducing quantity from the cart...
  quantityMinusHandler(idx) {
    const{ currencySymbol } = this.state
    if (this.state.cartItems[idx].quantity > 0) {
      let items = [...this.state.cartItems];
      let item = { ...items[idx] };
      item.quantity = this.state.cartItems[idx].quantity - 1;
      item.itemTotalPrice =
        (this.state.cartItems[idx].itemFixedPrice[currencySymbol[0]].amount * 100 * item.quantity) / 100;
      items[idx] = item;

      this.setState({ cartItems: items });
      this.cartCountMinusHandler();
      const newTotal =
        ((this.state.totalPrice * 100) -
          (this.state.cartItems[idx].itemFixedPrice[currencySymbol[0]].amount * 100)) /
        100;

      // Getting tax...
      const tax = (newTotal * 100 * (21 / 100)) / 100;

      this.setState({ totalPrice: Number(newTotal.toFixed(2)) });
      this.setState({ tax: Number(tax.toFixed(2)) });

      // Calling the delete item fn...
      if (item.quantity === 0) {
        this.deleteItem(idx);
      }
    }
  }

  // Navigate displayed image to the right...
  navigateImageRight(idx, length) {
    const currentIdx = this.state.cartItems[idx].currentImageIdx;

    if (currentIdx !== length - 1) {
      let items = [...this.state.cartItems];
      let item = { ...items[idx] };
      item.currentImageIdx = currentIdx + 1;
      items[idx] = item;

      this.setState({ cartItems: items });
    } else if (currentIdx === length - 1) {
      let items = [...this.state.cartItems];
      let item = { ...items[idx] };
      item.currentImageIdx = 0;
      items[idx] = item;

      this.setState({ cartItems: items });
    }
  }

  // Navigate displayed image to the left...
  navigateImageLeft(idx, length) {
    const currentIdx = this.state.cartItems[idx].currentImageIdx;
    if (currentIdx > 0) {
      let items = [...this.state.cartItems];
      let item = { ...items[idx] };
      item.currentImageIdx = currentIdx - 1;
      items[idx] = item;

      this.setState({ cartItems: items });
    } else if (currentIdx === 0) {
      let items = [...this.state.cartItems];
      let item = { ...items[idx] };
      item.currentImageIdx = length - 1;
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
                <Redirect to="/category/all" />
              </Route>
              <Route
                exact
                path="/category/:category"
                render={(props) => (
                  <Homepage
                    {...props}
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
                    checkout={this.checkout}
                    changeCategory={this.changeCategory}
                    category={this.state.category}
                    calculateCurrencyHandler={this.calculateCurrencyHandler}
                    getTotalHandler={this.getTotalHandler}
                    setTotalHandler={this.setTotalHandler}
                  />
                )}
              ></Route>
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
                    checkout={this.checkout}
                    changeCategory={this.changeCategory}
                    calculateCurrencyHandler={this.calculateCurrencyHandler}
                    getTotalHandler={this.getTotalHandler}
                    setTotalHandler={this.setTotalHandler}
                  />
                )}
              />
              <Route
                exact
                path="/cart"
                render={(props) => (
                  <CartContainer
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
                    checkout={this.checkout}
                    changeCategory={this.changeCategory}
                    calculateCurrencyHandler={this.calculateCurrencyHandler}
                    getTotalHandler={this.getTotalHandler}
                    setTotalHandler={this.setTotalHandler}
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
