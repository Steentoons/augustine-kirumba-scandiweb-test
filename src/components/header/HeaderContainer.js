import React, { PureComponent } from "react";
import Header from "./Header";
import CartItemsQueryContainer from "../cart-items-query/CartItemsQueryContainer";
import { CATEGORIES_QUERY, CURRENCIES_QUERY } from "../../lib/queries";
import { v4 as uuidv4 } from "uuid";
import { Query } from "react-apollo";
import CategoriesContainer from "../categories/CategoriesContainer";

export default class HeaderContainer extends PureComponent {
  constructor() {
    super();
    this.state = {
      currencyButtonClick: false,
      currentCurrencyIndex: 0,
      cartOverlayOpen: false,
      totals: 0,
    };
    this.grandTotal = this.grandTotal.bind(this);
    this.currencyButtonHandler = this.currencyButtonHandler.bind(this);
    this.calculateTotalHandler = this.calculateTotalHandler.bind(this);
    this.updateCurrencyHandler = this.updateCurrencyHandler.bind(this);
    this.cartOverlayHandler = this.cartOverlayHandler.bind(this);
    this.cartOverlayBackgroundHandler =
      this.cartOverlayBackgroundHandler.bind(this);
    this.itemTotalHandler = this.itemTotalHandler.bind(this);
    this.cartOverlayActionHandler = this.cartOverlayActionHandler.bind(this);
    this.itemTitleStyle = this.itemTitleStyle.bind(this);
    this.overlayBgStyle = this.overlayBgStyle.bind(this);
    this.cartCountStyle = this.cartCountStyle.bind(this);
    this.printCartItems = this.printCartItems.bind(this);
    this.currencyDropStyle = this.currencyDropStyle.bind(this);
    this.printCurrency = this.printCurrency.bind(this);
    this.currenciesQuery = this.currenciesQuery.bind(this);
    this.printCategories = this.printCategories.bind(this);
    this.categoriesQuery = this.categoriesQuery.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { currencySymbol, cartItems, setTotalHandler } = this.props;
    if (prevProps.currencySymbol[0] !== currencySymbol[0]) {
      const grandTotal = this.grandTotal(cartItems, currencySymbol);

      setTotalHandler(grandTotal);
    }
  }

  // Update every item price in the state...
  grandTotal(cartItems, currencySymbol) {
    let grandTotal = 0;
    if (cartItems && cartItems.length > 0) {
      cartItems.forEach((item) => {
        const newItemFixedTotal = item.itemFixedPrice[currencySymbol[0]].amount;
        const itemTotal = (newItemFixedTotal * item.quantity * 100) / 100;

        grandTotal += itemTotal;
      });
    }

    return grandTotal.toFixed(2);
  }

  currencyButtonHandler() {
    this.setState({ currencyButtonClick: !this.state.currencyButtonClick });
  }

  // Calculating the total for each item...
  itemTotalHandler(symbol, price, quantity) {
    return `${symbol}${((price * 100 * quantity) / 100).toFixed(2)}`;
  }

  // Calculate the total...
  calculateTotalHandler() {
    const { cartItems } = this.props;
    let result = 0;
    cartItems.forEach((item) => {
      result = (result * 100 + item.itemFixedPrice * 100) / 100;
    });

    return result;
  }

  updateCurrencyHandler(e) {
    const { currencyHandler } = this.props;
    this.setState({ currencyButtonClick: false });
    currencyHandler(e);
  }

  cartOverlayBackgroundHandler() {
    this.setState({ cartOverlayOpen: false });
  }

  cartOverlayHandler(e) {
    e.stopPropagation();
  }

  cartOverlayActionHandler() {
    this.setState({
      cartOverlayOpen: !this.state.cartOverlayOpen,
      currencyButtonClick: false,
    });
  }

  cartCountStyle(cartCount) {
    const CartDisplay = cartCount <= 0 ? "none" : "block";

    return CartDisplay;
  }

  overlayBgStyle(cartOverlayOpen) {
    const overlayDisplay = cartOverlayOpen ? "block" : "none";

    return overlayDisplay;
  }

  itemTitleStyle(cartCount) {
    const itemTitle = cartCount === 1 ? "item" : "items";

    return itemTitle;
  }

  currenciesQueryFn({ loading, data }) {
    if (loading) return null;

    const printCurrency = data.currencies.map((currency, idx) => {
      return (
        <li
          key={uuidv4()}
          data-currindex={idx}
          data-curr_currency={currency.symbol}
          onClick={(e) => {
            this.updateCurrencyHandler(e);
          }}
        >
          {`${currency.symbol} ${currency.label.toUpperCase()}`}
        </li>
      );
    });

    return printCurrency;
  }

  currencyDropStyle(currencyButtonClick) {
    const currencyDropdownStyle = {
      display: currencyButtonClick ? "block" : "none",
    };

    return currencyDropdownStyle;
  }

  // Handle attributes per item in cart...
  printCartItems(cartItems, currencySymbol, quantityHandler, navigateImage) {
    const printCartItems = cartItems.map((item, idx) => {
      const id = item.productId;
      const attributeArray = item.attributes;

      return (
        <CartItemsQueryContainer
          key={idx}
          id={id}
          attributeArray={attributeArray}
          currencySymbol={currencySymbol}
          cartItems={cartItems}
          quantityHandler={quantityHandler}
          idx={idx}
          navigateImage={navigateImage}
          itemTotalHandler={this.itemTotalHandler}
          setTotalHandler={this.setTotalHandler}
          item={item.attributes.attribute}
        />
      );
    });

    return printCartItems;
  }

  categoriesQuery(CATEGORIES_QUERY, changeCategory, category) {
    return (
      <Query query={CATEGORIES_QUERY}>
        {({ loading, data }) => {
          if (loading) return null;
          const { categories } = data;
          const allcategories = this.printCategories(
            categories,
            changeCategory,
            category
          );

          return allcategories;
        }}
      </Query>
    );
  }

  printCategories(categories, changeCategory, category) {
    const allcategories = categories.map((actualCategory, idx) => {
      return (
        <CategoriesContainer
          key={uuidv4()}
          category={actualCategory.name.toUpperCase()}
          changeCategory={changeCategory}
          categoryState={category}
        />
      );
    });

    return allcategories;
  }

  currenciesQuery(CURRENCIES_QUERY, updateCurrencyHandler) {
    return (
      <Query query={CURRENCIES_QUERY}>
        {({ loading, data }) => {
          if (loading) return null;
          const printCurrency = this.printCurrency(data, updateCurrencyHandler);

          return printCurrency;
        }}
      </Query>
    );
  }

  printCurrency(data, updateCurrencyHandler) {
    const printCurrency = data.currencies.map((currency, idx) => {
      return (
        <li
          key={uuidv4()}
          data-currindex={idx}
          data-curr_currency={currency.symbol}
          onClick={(e) => {
            updateCurrencyHandler(e);
          }}
        >{`${currency.symbol} ${currency.label.toUpperCase()}`}</li>
      );
    });

    return printCurrency;
  }

  render() {
    const {
      cartItems,
      currencySymbol,
      quantityHandler,
      navigateImage,
      changeCategory,
      cartCount,
      totalPrice,
      checkout,
      category,
    } = this.props;
    const { currencyButtonClick } = this.state;
    const currencyDropdownStyle = this.currencyDropStyle(currencyButtonClick);
    const printCartItems = this.printCartItems(
      cartItems,
      currencySymbol,
      quantityHandler,
      navigateImage
    );

    return (
      <Header
        CATEGORIES_QUERY={CATEGORIES_QUERY}
        changeCategory={changeCategory}
        category={category}
        currencySymbol={currencySymbol}
        currencyDropdownStyle={currencyDropdownStyle}
        CURRENCIES_QUERY={CURRENCIES_QUERY}
        cartCount={cartCount}
        printCartItems={printCartItems}
        totalPrice={totalPrice}
        checkout={checkout}
        cartOverlayOpen={this.state.cartOverlayOpen}
        cartOverlayActionHandler={this.cartOverlayActionHandler}
        cartOverlayBackgroundHandler={this.cartOverlayBackgroundHandler}
        cartOverlayHandler={this.cartOverlayHandler}
        updateCurrencyHandler={this.updateCurrencyHandler}
        currencyButtonHandler={this.currencyButtonHandler}
        cartCountStyle={this.cartCountStyle}
        overlayBgStyle={this.overlayBgStyle}
        itemTitleStyle={this.itemTitleStyle}
        categoriesQuery={this.categoriesQuery}
        currenciesQuery={this.currenciesQuery}
      />
    );
  }
}
