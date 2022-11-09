import React, { Component } from "react";
import Cart from "./Cart";
import CartItemsQuery from "../components/CartItemsQuery";

export default class CartContainer extends Component {
  constructor() {
    super();

    this.state = {
      quantity: 0,
      totals: [],
    };

    this.plusHandler = this.plusHandler.bind(this);
    this.minusHandler = this.minusHandler.bind(this);
    this.itemTotalHandler = this.itemTotalHandler.bind(this);
    this.setTotalHandler = this.setTotalHandler.bind(this)
  }

  plusHandler(idx) {
    this.setState((prev) => {
      return { quantity: prev.quantity + 1 };
    });
  }

  setTotalHandler(data) {
    this.setState({
      totals: [...this.state.totals, data.product.prices],
    })
  }

  itemTotalHandler(symbol, price, quantity, id) {
    return `${symbol}${(price * 100 * quantity) / 100}`;
  }
  minusHandler() {}
  render() {
    const {
      currencySymbol,
      quantityPlusHandler,
      quantityMinusHandler,
      navigateImageLeft,
      navigateImageRight,
      cartCount,
      totalPrice,
      checkout,
      currencyHandler,
      changeCategory,
      calculateCurrencyHandler,
      getTotalHandler,
      setTotalHandler,
      cartItems,
    } = this.props;

    // Handle attributes per item in cart...
    const printCartItems = cartItems.map((item, idx) => {
      const id = item.productId;
      const attributeArray = item.attributes;
      let result = null;
      const query = (
        <CartItemsQuery
          attributeArray={attributeArray}
          currencySymbol={currencySymbol}
          cartItems={cartItems}
          quantityPlusHandler={quantityPlusHandler}
          idx={idx}
          navigateImageRight={navigateImageRight}
          navigateImageLeft={navigateImageLeft}
          quantityMinusHandler={quantityMinusHandler}
          result={result}
          itemTotalHandler={this.itemTotalHandler}
          setTotalHandler={this.setTotalHandler}
          id={id}
          item={item.attributes.attribute}
        />
      );

      return query;
    });

    return (
      <Cart
        printCartItems={printCartItems}
        cartItems={cartItems}
        cartCount={cartCount}
        quantityMinusHandler={quantityMinusHandler}
        quantityPlusHandler={quantityPlusHandler}
        totalPrice={totalPrice}
        navigateImageRight={navigateImageRight}
        navigateImageLeft={navigateImageLeft}
        currencySymbol={currencySymbol}
        currencyHandler={currencyHandler}
        checkout={checkout}
        changeCategory={changeCategory}
        calculateCurrencyHandler={calculateCurrencyHandler}
        getTotalHandler={getTotalHandler}
        setTotalHandler={setTotalHandler}
      />
    );
  }
}
