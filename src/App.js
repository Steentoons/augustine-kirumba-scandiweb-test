import React, { PureComponent } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import _ from "lodash";

import "./assets/css/main.css";
import Homepage from "./pages/Homepage";
import ProductView from "./pages/ProductView";
import CartContainer from "./pages/CartContainer";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
});

class App extends PureComponent {
  constructor() {
    super();

    const oldState = JSON.parse(sessionStorage.getItem("oldState"));
    const oldCartItems = JSON.parse(sessionStorage.getItem("oldCartItems"));

    this.state = {
      cartItems: oldCartItems ? JSON.parse(oldCartItems?.cartItems) : [],
      cartCount: oldState?.cartCount ?? 0,
      totalPrice: oldState?.totalPrice ?? 0,
      tax: oldState?.tax ?? 0,
      currencySymbol: oldState ? JSON.parse(oldState?.currencySymbol) : [0, "$"],
      category: "all",
    };

    // Binding Handlers...
    this.cartItemsHandler = this.cartItemsHandler.bind(this);
    this.cartCountPlusHandler = this.cartCountPlusHandler.bind(this);
    this.cartCountMinusHandler = this.cartCountMinusHandler.bind(this);
    this.quantityHandler = this.quantityHandler.bind(this);
    this.navigateImage = this.navigateImage.bind(this);
    this.currencyHandler = this.currencyHandler.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.checkout = this.checkout.bind(this);
    this.changeCategory = this.changeCategory.bind(this);
    this.getTotalHandler = this.getTotalHandler.bind(this);
    this.setTotalHandler = this.setTotalHandler.bind(this);
    this.newTotalFn = this.newTotalFn.bind(this);
  }

  componentDidUpdate(prevState) {
    const { cartCount, totalPrice, tax, currencySymbol } = this.state;
    const { cartItems } = this.state;

    if (
      cartCount !== prevState.cartCount ||
      totalPrice !== prevState.totalPrice ||
      tax !== prevState.tax ||
      !_.isEqual(currencySymbol, prevState.currencySymbol)
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

    if (!_.isEqual(cartItems, prevState.cartItems)) {
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

  // Changing currency...
  currencyHandler(e) {
    const idx = Number(e.currentTarget.dataset.currindex);
    const currentCurrency = e.currentTarget.dataset.curr_currency;
    const items = [...this.state.currencySymbol];
    items[0] = idx;
    items[1] = currentCurrency;
    this.setState({ currencySymbol: items });
  }

  // Adding items to the cart...
  cartItemsHandler(product) {
    const { currencySymbol } = this.state;
    const currentCartItems = this.state.cartItems;
    const newItems = [].concat(currentCartItems, product);
    this.setState({ cartItems: JSON.parse(JSON.stringify(newItems)) });
    const newTotal =
      (this.state.totalPrice * 100 +
        product.itemFixedPrice[currencySymbol[0]].amount * 100) /
      100;

    // Getting tax...
    const tax = (newTotal * 100 * (21 / 100)) / 100;

    this.setState({ totalPrice: newTotal, tax: Number(tax.toFixed(2)) });

    this.cartCountPlusHandler();
  }

  // Calculating the grand total after currency change...
  getTotalHandler(fixedAmount, quantity, grandTotal, idx) {
    const { currencySymbol } = this.state;
    const items = [...this.state.cartItems];
    const item = { ...items[idx] };
    item.itemFixedPrice[currencySymbol[0]].amount = fixedAmount;
    items[idx] = item;
    this.setState({ cartItems: items });

    const itemPrice = (fixedAmount * quantity * 100) / 100;

    grandTotal = (grandTotal * 100 + itemPrice * 100) / 100;

    return grandTotal;
  }

  // Setting the total to state after currency change...
  setTotalHandler(grandTotal) {
    this.setState({ totalPrice: grandTotal });
  }

  // Deleting items from the cart...
  deleteItem(idx) {
    const items = [...this.state.cartItems];

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
    return `${symbol}${(price * 100 * quantity) / 100}`;
  }

  // Adding and reducing quantity to the cart...
  quantityHandler(idx, quantity) {
    const { currencySymbol } = this.state;
    const items = [...this.state.cartItems];
    const item = { ...items[idx] };
    let newTotal = 0;
    const fixedPrice =
      this.state.cartItems[idx].itemFixedPrice[currencySymbol[0]].amount * 100;

    item.itemTotalPrice = (fixedPrice * 100 * item.quantity) / 100;
    items[idx] = item;
    this.setState({ cartItems: items });

    if (quantity === "plus") {
      item.quantity = this.state.cartItems[idx].quantity + 1;

      this.cartCountPlusHandler();
      newTotal = this.newTotalFn("plus", fixedPrice);
    } else if (quantity === "minus") {
      if (this.state.cartItems[idx].quantity > 0) {
        item.quantity = this.state.cartItems[idx].quantity - 1;

        this.cartCountMinusHandler();
        newTotal = this.newTotalFn("minus", fixedPrice);

        if (item.quantity === 0) {
          this.deleteItem(idx);
        }
      }
    }

    // Getting tax...
    const tax = (newTotal * 100 * (21 / 100)) / 100;

    this.setState({
      totalPrice: newTotal,
      tax: tax,
    });
  }

  newTotalFn(quantity, fixedPrice) {
    const totalPrice = this.state.totalPrice * 100;

    if (quantity === "minus") {
      return (totalPrice - fixedPrice) / 100;
    } else if (quantity === "plus") {
      return (totalPrice + fixedPrice) / 100;
    }
  }

  // Navigate displayed image to the right...
  navigateImage(idx, length, nav) {
    const currentIdx = this.state.cartItems[idx].currentImageIdx;
    const items = [...this.state.cartItems];
    const item = { ...items[idx] };

    if (nav === "left") {
      if (currentIdx > 0) {
        item.currentImageIdx = currentIdx - 1;
      } else if (currentIdx === 0) {
        item.currentImageIdx = length - 1;
      }
    } else if (nav === "right") {
      if (currentIdx !== length - 1) {
        item.currentImageIdx = currentIdx + 1;
      } else if (currentIdx === length - 1) {
        item.currentImageIdx = 0;
      }
    }

    items[idx] = item;
    this.setState({ cartItems: items });
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
                    quantityHandler={this.quantityHandler}
                    navigateImage={this.navigateImage}
                    totalPrice={this.state.totalPrice}
                    cartItemsHandler={this.cartItemsHandler}
                    cartCountPlusHandler={this.cartCountPlusHandler}
                    currencySymbol={this.state.currencySymbol}
                    currencyHandler={this.currencyHandler}
                    checkout={this.checkout}
                    changeCategory={this.changeCategory}
                    category={this.state.category}
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
                    quantityHandler={this.quantityHandler}
                    totalPrice={this.state.totalPrice}
                    navigateImage={this.navigateImage}
                    currencySymbol={this.state.currencySymbol}
                    currencyHandler={this.currencyHandler}
                    checkout={this.checkout}
                    changeCategory={this.changeCategory}
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
                    quantityHandler={this.quantityHandler}
                    totalPrice={this.state.totalPrice}
                    navigateImage={this.navigateImage}
                    tax={this.state.tax}
                    currencySymbol={this.state.currencySymbol}
                    currencyHandler={this.currencyHandler}
                    checkout={this.checkout}
                    changeCategory={this.changeCategory}
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
