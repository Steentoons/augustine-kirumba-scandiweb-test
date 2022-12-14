import React, { PureComponent } from "react";
import ApolloClient from "apollo-boost";
import _ from "lodash";
import Main from "./Main";
import { LEFT, MINUS, PLUS, RIGHT } from "../../lib/constants";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
});

export class MainContainer extends PureComponent {
  constructor() {
    super();

    const oldState = JSON.parse(sessionStorage.getItem("oldState"));
    const oldCartItems = JSON.parse(sessionStorage.getItem("oldCartItems"));

    this.state = {
      cartItems: oldCartItems ? JSON.parse(oldCartItems?.cartItems) : [],
      cartCount: oldState?.cartCount ?? 0,
      totalPrice: oldState?.totalPrice ?? 0,
      tax: oldState?.tax ?? 0,
      currencySymbol: oldState
        ? JSON.parse(oldState?.currencySymbol)
        : [0, "$"],
      category: "all",
    };
  }

  componentDidUpdate = prevState => {
    this.persistState(
      prevState.cartCount,
      prevState.totalPrice,
      prevState.tax,
      prevState.currencySymbol
    );
    this.persistCartItems(prevState.cartItems);
  }

  persistState = (prevCartCount, prevTotalPrice, prevTax, prevCurrencySymbol) => {
    const { cartCount, totalPrice, tax, currencySymbol } = this.state;
    if (
      cartCount !== prevCartCount ||
      totalPrice !== prevTotalPrice ||
      tax !== prevTax ||
      !_.isEqual(currencySymbol, prevCurrencySymbol)
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
  }

  persistCartItems = prevCartItems => {
    const { cartItems } = this.state;
    if (!_.isEqual(cartItems, prevCartItems)) {
      sessionStorage.setItem(
        "oldCartItems",
        JSON.stringify({ cartItems: JSON.stringify(cartItems) })
      );
    }
  }

  // Changing category...
  changeCategory = currentCategory => {
    this.setState({ category: currentCategory });
  }

  // Changing currency...
  currencyHandler = e => {
    const newCurrency = this.updateCurrency(e);
    this.updateCurrencySymbol(newCurrency)
  }

  updateCurrencySymbol = newCurrency => {
    this.setState({ currencySymbol: newCurrency });
  }

  updateCurrency = e => {
    const idx = Number(e.currentTarget.dataset.currindex);
    const currentCurrency = e.currentTarget.dataset.curr_currency;
    const newCurrency = [...this.state.currencySymbol];
    newCurrency[0] = idx;
    newCurrency[1] = currentCurrency;

    return newCurrency;
  }

  // Adding items to the cart...
  cartItemsHandler = product => {
    this.updateCartItemsFromJSON(product);
    const newTotal = this.newTotal(product);
    const tax = this.getTax(newTotal);
    this.updateTotalTax(newTotal, tax)
    this.cartCountHandler(PLUS);
  }

  // Updating total and tax states...
  updateTotalTax = (newTotal, tax) => {
    this.setState({ totalPrice: newTotal, tax: tax });
  }

  updateCartItemsFromJSON = product => {
    const newItems = this.updateCartItemsFromJSONConcat(product)
    this.updateCartItemsState(JSON.parse(JSON.stringify(newItems)))
  }

  updateCartItemsFromJSONConcat = product => {
    const currentCartItems = this.state.cartItems;
    return [].concat(currentCartItems, product);
  }

  // Getting tax...
  getTax(newTotal) {
    return ((newTotal * 100 * (21 / 100)) / 100).toFixed(2);
  }

  newTotal(product) {
    const { currencySymbol } = this.state;
    return (
      (this.state.totalPrice * 100 +
        product.itemFixedPrice[currencySymbol[0]].amount * 100) /
      100
    ).toFixed(2);
  }

  // Adding individual item quantity to the cart...
  cartCountHandler = duty => {
    this.setState((prev) => this.cartCountPlusMinus(prev, duty));
  }

  cartCountPlusMinus = (prev, duty) => {
    switch (duty) {
      case PLUS:
        return { cartCount: prev.cartCount + 1 };
      case MINUS:
        return { cartCount: prev.cartCount - 1 };
      default:
        break;
    }
  }

  // Calculating the grand total after currency change...
  getTotalHandler = (fixedAmount, quantity, grandTotal, idx) => {
    const newCartItems = this.updateCartItems(idx, fixedAmount);
    this.updateCartItemsState(newCartItems)
    return this.getGrandTotal(fixedAmount, quantity, grandTotal);
  }

  updateCartItemsState = newCartItems => {
    this.setState({ cartItems: newCartItems })
  }

  getGrandTotal = (fixedAmount, quantity, grandTotal) => {
    const itemPrice = this.itemPriceFn(fixedAmount, quantity)
    return this.grandTotalFn(grandTotal, itemPrice);
  }

  grandTotalFn = (grandTotal, itemPrice) => {
    return (grandTotal = (grandTotal * 100 + itemPrice * 100) / 100)
  }

  itemPriceFn = (fixedAmount, quantity) => {
    return (fixedAmount * quantity * 100) / 100;
  }

  updateCartItems = (idx, fixedAmount) => {
    const { currencySymbol } = this.state;
    const newCartItems = [...this.state.cartItems];
    const item = { ...newCartItems[idx] };
    item.itemFixedPrice[currencySymbol[0]].amount = fixedAmount;
    newCartItems[idx] = item;

    return newCartItems;
  }

  // Setting the total to state after currency change...
  setTotalHandler = grandTotal => {
    this.setState({ totalPrice: grandTotal });
  }

  // Ordering and clearing cart...
  checkout = () => {
    this.setState({ cartItems: [], cartCount: 0, totalPrice: 0, tax: 0 });
  }

  // Adding and reducing quantity to the cart...
  quantityHandler = (idx, quantity) => {
    const { cartItem, fixedPrice } = this.updateCartItemsWithQuantity(idx);
    const newTotal = this.updateQuantityPlusMinus(
      quantity,
      cartItem,
      idx,
      fixedPrice
    );
    const tax = this.getTax(newTotal);
    this.updateTotalTax(newTotal, tax)
  }

  updateQuantityPlusMinus = (quantity, cartItem, idx, fixedPrice) => {
    const newTotal = 0;
    switch (quantity) {
      case PLUS:
        cartItem.quantity = this.quantityPlusMinusFn( idx, PLUS )
        return this.getTotalFromQuantity(quantity, fixedPrice, newTotal);
      case MINUS:
        return this.updateQuantityMinus(idx, cartItem, quantity, fixedPrice, newTotal)
      default:
        break;
    }
  }

  quantityPlusMinusFn = ( idx, duty ) => {
    const {cartItems} = this.state
    const quantityState = cartItems[idx].quantity
    switch (duty) {
      case PLUS:
        return quantityState + 1;
      case MINUS:
        return quantityState - 1;
      default:
        break
    }
  }

  updateQuantityMinus = (idx, cartItem, quantity, fixedPrice, newTotal) => {
    if (this.state.cartItems[idx].quantity > 0) {
      cartItem.quantity = this.quantityPlusMinusFn(idx, MINUS);
      this.checkDelete(cartItem, idx)

      return this.getTotalFromQuantity(quantity, fixedPrice, newTotal);
    }
  }

  checkDelete = (cartItem, idx) => {
    if (cartItem.quantity === 0) this.deleteItem(idx);
  }

  getTotalFromQuantity = (quantity, fixedPrice, total) => {
    this.cartCountHandler(quantity);
    return this.newTotalFn(quantity, fixedPrice);
  }

  newTotalFn = (quantity, fixedPrice) => {
    const totalPrice = this.state.totalPrice * 100;
    switch (quantity) {
      case PLUS:
        return ((totalPrice + fixedPrice) / 100).toFixed(2);
      case MINUS:
        return ((totalPrice - fixedPrice) / 100).toFixed(2);
      default:
        break
    }
  }

  // Updating the cart items with the quantity...
  updateCartItemsWithQuantity = idx => {
    const fixedPrice = this.getFixedPrice(idx);
    const cartItem = this.updateCartItemsFromQuantity(idx, fixedPrice);

    return { cartItem, fixedPrice };
  }

  updateCartItemsFromQuantity = (idx, fixedPrice) => {
    const cartItem = this.cartItemsFromQuantityFn(idx)
    this.itemPriceFn(fixedPrice, cartItem.quantity) 

    return cartItem;
  }

  cartItemsFromQuantityFn = (idx) => {
    const newCartItems = [...this.state.cartItems];
    const cartItem = { ...newCartItems[idx] };
    newCartItems[idx] = cartItem;
    this.updateCartItemsState(newCartItems)

    return cartItem
  }

  getFixedPrice = idx => {
    const { currencySymbol } = this.state;
    return (
      this.state.cartItems[idx].itemFixedPrice[currencySymbol[0]].amount * 100
    );
  }

  // Deleting items from the cart...
  deleteItem = idx => {
    const items = [...this.state.cartItems];
    this.updateCartItemsState(this.filterDeleteItems(items, idx))
  }

  filterDeleteItems = (items, idx) => {
    return items.filter((item, filterIdx) => {
      return filterIdx !== idx;
    });
  }

  // Navigate displayed image to the right and left...
  navigateImage = (idx, length, nav) => {
    const newCartItems = this.navigateImageHelper(idx, nav, length);
    this.updateCartItemsState(newCartItems)
  }

  navigateImageHelper = (idx, nav, length) => {
    const currentIdx = this.state.cartItems[idx].currentImageIdx;
    const items = [...this.state.cartItems];
    const item = { ...items[idx] };
    switch (nav) {
      case LEFT:
        return this.navigateImageLeft(currentIdx, length, item, items, idx);
      case RIGHT:
        return this.navigateImageRight(currentIdx, length, item, items, idx);
      default:
        break
    }
  }

  navigateImageRight = (currentIdx, length, item, rightItem, idx) => {
    if (currentIdx !== length - 1) item.currentImageIdx = currentIdx + 1;
    else if (currentIdx === length - 1) item.currentImageIdx = 0;
    rightItem[idx] = item;

    return rightItem;
  }

  navigateImageLeft = (currentIdx, length, item, leftItem, idx) => {
    if (currentIdx > 0) item.currentImageIdx = currentIdx - 1;
    else if (currentIdx === 0) item.currentImageIdx = length - 1;
    leftItem[idx] = item;

    return leftItem;
  }

  // Checking on cart duplicates...
  checkCartDuplicates = (currentProduct, productId, singleAttribute) => {
    const { cartItems } = this.state;
    if (cartItems.length === 0)
      this.cartStateHandler(currentProduct, productId, singleAttribute);
    else this.checkingDuplicates(currentProduct, productId, singleAttribute);
  }

  checkingDuplicates = (currentProduct, productId, singleAttribute) => {
    const duplicateIdx = this.duplicateIdx(singleAttribute)
    this.duplicateActionFn(duplicateIdx, currentProduct, productId, singleAttribute)
  }

  duplicateActionFn = (duplicateIdx, currentProduct, productId, singleAttribute ) => {
    if (duplicateIdx === -1)
      this.cartStateHandler(currentProduct, productId, singleAttribute);
    else {
      this.quantityHandler(duplicateIdx, PLUS);
    }
  }

  duplicateIdx = (singleAttribute) => {
    const { cartItems } = this.state;
    return cartItems.findIndex(item => {
      return _.isEqual(item.attributes, singleAttribute)
    })
  }

  // Setting the main cart item state to be used all over the project...
  cartStateHandler = (currentProduct, productId, singleAttribute) => {
    const newData = this.getCurrentData(currentProduct, productId, {
      ...singleAttribute,
    });
    this.cartItemsHandler(newData);
  }

  // getting the current data to be used to update items...
  getCurrentData = (currentProduct, productId, attributes) => {
    const quantity = 1;
    const itemFixedPrice = currentProduct.prices;
    const itemTotalPrice = itemFixedPrice;
    const currentImageIdx = 0;

    return {
      attributes,
      productId,
      quantity,
      itemFixedPrice,
      itemTotalPrice,
      currentImageIdx,
    };
  }

  // Updating the attributes...
  updateAttributes = (currentId, attrArr) => {
    this.setState({
      attributes: { id: currentId, attribute: attrArr },
    });
  }

  render() {
    return (
      <Main
        client={client}
        cartItems={this.state.cartItems}
        cartCount={this.state.cartCount}
        quantityHandler={this.quantityHandler}
        navigateImage={this.navigateImage}
        totalPrice={this.state.totalPrice}
        cartItemsHandler={this.cartItemsHandler}
        cartCountHandler={this.cartCountHandler}
        currencySymbol={this.state.currencySymbol}
        currencyHandler={this.currencyHandler}
        checkout={this.checkout}
        changeCategory={this.changeCategory}
        category={this.state.category}
        getTotalHandler={this.getTotalHandler}
        setTotalHandler={this.setTotalHandler}
        getTax={this.getTax}
        tax={this.state.tax}
        checkCartDuplicates={this.checkCartDuplicates}
        updateAttributes={this.updateAttributes}
      />
    );
  }
}

export default MainContainer;
