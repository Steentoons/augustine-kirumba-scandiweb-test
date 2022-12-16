import React from "react";
import logo from "../../assets/images/logo.png";
import currency_arrow_down from "../../assets/images/currency-arrow-down.png";
import empty_cart from "../../assets/images/empty-cart.png";
import { Query } from "react-apollo";
import CategoriesContainer from "../categories/CategoriesContainer";
import { Link } from "react-router-dom";
import { PureComponent } from "react";
import "../../assets/css/header.css";
import { v4 as uuidv4 } from "uuid";

export class Header extends PureComponent {
  constructor() {
    super();

    this.printCurrency = this.printCurrency.bind(this);
    this.currenciesQuery = this.currenciesQuery.bind(this);
    this.printCategories = this.printCategories.bind(this);
    this.categoriesQuery = this.categoriesQuery.bind(this);
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
      CATEGORIES_QUERY,
      changeCategory,
      category,
      currencySymbol,
      currencyDropdownStyle,
      CURRENCIES_QUERY,
      cartCount,
      printCartItems,
      totalPrice,
      checkout,
      cartOverlayOpen,
      cartOverlayActionHandler,
      cartOverlayBackgroundHandler,
      cartOverlayHandler,
      updateCurrencyHandler,
      currencyButtonHandler,
      cartCountStyle,
      overlayBgStyle,
      itemTitleStyle,
    } = this.props;

    return (
      <div className="header-wrapper">
        <header className="header-container">
          <div className="categories-container">
            <ul>
              {this.categoriesQuery(CATEGORIES_QUERY, changeCategory, category)}
            </ul>
          </div>
          <Link
            onClick={() => {
              changeCategory("all");
            }}
            to="/category/all"
            className="header-logo"
          >
            <img className="logo" src={logo} alt="logo" />
          </Link>
          <div className="top-right-buttons-container">
            <div
              className="currency-symbol-button"
              onClick={() => {
                currencyButtonHandler();
              }}
            >
              <div className="currency-symbol">{currencySymbol[1]}</div>
              <img src={currency_arrow_down} alt="currency arrow down" />
            </div>
            <div
              className="currency-dropdown-div"
              style={currencyDropdownStyle}
            >
              <div className="currency-absolute-dropdown">
                <ul>
                  {this.currenciesQuery(
                    CURRENCIES_QUERY,
                    updateCurrencyHandler
                  )}
                </ul>
              </div>
            </div>
            <div
              className="empty-cart-button"
              onClick={() => {
                cartOverlayActionHandler();
              }}
            >
              <img src={empty_cart} alt="empty cart" />
              <div
                className="cart-notification-container"
                style={{ display: cartCountStyle(cartCount) }}
              >
                <div className="cart-notification">{cartCount}</div>
              </div>
            </div>

            <div
              className="cart-overlay-background-container"
              style={{ display: overlayBgStyle(cartOverlayOpen) }}
            >
              <div
                className="cart-overlay-background"
                data-overlay_background={true}
                onClick={() => {
                  cartOverlayBackgroundHandler();
                }}
              >
                <div className="cart-overlay-wrapper">
                  <div
                    className="cart-overlay"
                    onClick={(e) => {
                      cartOverlayHandler(e);
                    }}
                  >
                    <div className="cart-top-items">
                      <div className="cart-overlay-title">
                        My Bag,
                        <span>{`${cartCount} ${itemTitleStyle(
                          cartCount
                        )}`}</span>
                      </div>
                      <div className="cart-overlay-items-container">
                        {printCartItems}
                      </div>
                    </div>
                    <div className="cart-bottom-items-wrapper">
                      <div className="cart-bottom-items">
                        <div className="cart-overlay-total-container">
                          <div className="total-title">Total</div>
                          <div className="total-content">{`${currencySymbol[1]}${totalPrice}`}</div>
                        </div>
                        <div className="cart-overlay-buttons">
                          <Link
                            to="/cart"
                            onClick={() => {
                              cartOverlayBackgroundHandler();
                            }}
                          >
                            <button>VIEW BAG</button>
                          </Link>
                          <button
                            onClick={() => {
                              checkout();
                            }}
                          >
                            CHECK OUT
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>
    );
  }
}

export default Header;
