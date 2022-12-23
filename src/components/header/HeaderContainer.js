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
  }

  componentDidUpdate = (prevProps) => {
    const { currencySymbol, cartItems, setTotalHandler } = this.props;
    if (prevProps.currencySymbol[0] !== currencySymbol[0]) {
      const grandTotal = this.grandTotal(cartItems, currencySymbol);

      setTotalHandler(grandTotal);
    }
  };

  // Update every item price in the state...
  grandTotal = (cartItems, currencySymbol) => {
    const itemFixedPriceArr = this.itemFixedPriceMap(cartItems, currencySymbol)
      return this.itemFixedPriceReducer(itemFixedPriceArr)
      .toFixed(2);
  };

  itemFixedPriceReducer = itemFixedPriceArr => {
    return itemFixedPriceArr.reduce((total, fixedPrice) => {
      return total + fixedPrice;
    }, 0)
  }

  itemFixedPriceMap = (cartItems, currencySymbol) => {
    return cartItems.map((item) => {
      return (
        (item.itemFixedPrice[currencySymbol[0]].amount *
          (item.quantity * 100)) /
        100
      );
    })
  }

  currencyButtonHandler = () => {
    this.setState({ currencyButtonClick: !this.state.currencyButtonClick });
  };

  // Calculating the total for each item...
  itemTotalHandler = (symbol, price, quantity) => {
    return `${symbol}${((price * 100 * quantity) / 100).toFixed(2)}`;
  };

  // Calculate the total...
  calculateTotalHandler = () => {
    const { cartItems } = this.props;
    const total = this.calculateTotalHandlerMap(cartItems)
    return this.calculateTotalHandlerReducer(total)

    // return total;

    // const itemFixedPriceArr = this.itemFixedPriceFn(cartItems, currencySymbol)
    //   return this.itemFixedPriceReducer(itemFixedPriceArr)
    //   .toFixed(2);
  };

  calculateTotalHandlerReducer(total) {
    return total.reduce((total, fixedPrice) => {
      return (total * 100 + fixedPrice * 100) / 100;
    });
  }

  calculateTotalHandlerMap = (cartItems) => {
    return cartItems
      .map((item) => {
        return item.itemFixedPrice;
      })
  } 

  updateCurrencyHandler = (e) => {
    const { currencyHandler } = this.props;
    currencyHandler(e);
    this.currencyButtonClose()
  };

  currencyButtonClose = () => {
    this.setState({ currencyButtonClick: false });
  }

  cartOverlayBackgroundHandler = () => {
    this.setState({ cartOverlayOpen: false });
  };

  cartOverlayHandler = (e) => {
    e.stopPropagation();
  };

  cartOverlayActionHandler = () => {
    this.setState({
      cartOverlayOpen: !this.state.cartOverlayOpen,
      currencyButtonClick: false,
    });
  };

  cartCountStyle = (cartCount) => {
    return cartCount <= 0 ? "none" : "block";
  };

  overlayBgStyle = (cartOverlayOpen) => {
    return cartOverlayOpen ? "block" : "none";
  };

  itemTitleStyle = (cartCount) => {
    return cartCount === 1 ? "item" : "items";
  };

  currenciesQueryFn = ({ loading, data }) => {
    if (loading) return null;
    this.currenciesFn = (data)
  };

  currenciesFn = (data) => {
    return data.currencies.map((currency, idx) => {
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
  }

  currencyDropStyle = (currencyButtonClick) => {
    return {
      display: currencyButtonClick ? "block" : "none",
    };
  };

  // Handle attributes per item in cart...
  printCartItems = (
    cartItems,
    currencySymbol,
    quantityHandler,
    navigateImage
  ) => {
    return cartItems.map((item, idx) => {
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
  };

  categoriesQuery = (CATEGORIES_QUERY, changeCategory, category) => {
    return (
      <Query query={CATEGORIES_QUERY}>
        {({ loading, data }) => {
          if (loading) return null;
          return this.categoriesQueryFn(data, changeCategory, category)
        }}
      </Query>  
    );
  };

  categoriesQueryFn = (data, changeCategory, category ) => {
    const { categories } = data;
    return this.printCategories(categories, changeCategory, category);
  }

  printCategories = (categories, changeCategory, category) => {
    return categories.map((actualCategory) => {
      return (
        <CategoriesContainer
          key={uuidv4()}
          category={actualCategory.name.toUpperCase()}
          changeCategory={changeCategory}
          categoryState={category}
        />
      );
    });
  };

  currenciesQuery = (CURRENCIES_QUERY, updateCurrencyHandler) => {
    return (
      <Query query={CURRENCIES_QUERY}>
        {({ loading, data }) => {
          if (loading) return null;
          return this.printCurrency(data, updateCurrencyHandler);
        }}
      </Query>
    );
  };

  printCurrency = (data, updateCurrencyHandler) => {
    return data.currencies.map((currency, idx) => {
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
  };

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
