import React, { PureComponent } from "react";
import Cart from "./Cart";
import CartItemsQueryContainer from "../../components/cart-items-query/CartItemsQueryContainer";
import { v4 as uuidv4 } from "uuid";

export default class CartContainer extends PureComponent {
  constructor() {
    super();

    this.state = {
      quantity: 0,
      totals: [],
    };

    this.plusHandler = this.plusHandler.bind(this);
    this.itemTotalHandler = this.itemTotalHandler.bind(this);
    this.setTotalHandler = this.setTotalHandler.bind(this);
    this.printCartItems = this.printCartItems.bind(this);
  }

  plusHandler() {
    this.setState((prev) => {
      return { quantity: prev.quantity + 1 };
    });
  }

  setTotalHandler(data) {
    this.setState({
      totals: [...this.state.totals, data.product.prices],
    });
  }

  itemTotalHandler(symbol, price, quantity) {
    return `${symbol}${((price * 100 * quantity) / 100).toFixed(2)}`;
  }

  // Handle attributes per item in cart...
  printCartItems(cartItems, currencySymbol, quantityHandler, navigateImage) {
    return cartItems.map((item, idx) => {
      const id = item.productId;
      const attributeArray = item.attributes;
      return (
        <CartItemsQueryContainer
          key={uuidv4()}
          attributeArray={attributeArray}
          currencySymbol={currencySymbol}
          cartItems={cartItems}
          quantityHandler={quantityHandler}
          idx={idx}
          navigateImage={navigateImage}
          itemTotalHandler={this.itemTotalHandler}
          setTotalHandler={this.setTotalHandler}
          id={id}
          item={attributeArray.attribute}
        />
      );
    });
  }

  render() {
    const {
      currencySymbol,
      quantityHandler,
      navigateImage,
      cartCount,
      totalPrice,
      checkout,
      currencyHandler,
      changeCategory,
      calculateCurrencyHandler,
      getTotalHandler,
      setTotalHandler,
      cartItems,
      getTax,
    } = this.props;
    const printCartItems = this.printCartItems(
      cartItems,
      currencySymbol,
      quantityHandler,
      navigateImage
    );

    return (
      <Cart
        printCartItems={printCartItems}
        cartItems={cartItems}
        cartCount={cartCount}
        quantityHandler={quantityHandler}
        totalPrice={totalPrice}
        navigateImage={navigateImage}
        currencySymbol={currencySymbol}
        currencyHandler={currencyHandler}
        checkout={checkout}
        changeCategory={changeCategory}
        calculateCurrencyHandler={calculateCurrencyHandler}
        getTotalHandler={getTotalHandler}
        setTotalHandler={setTotalHandler}
        getTax={getTax}
      />
    );
  }
}
