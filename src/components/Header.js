import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { Link } from "react-router-dom";
import "../assets/css/header.css";
import logo from "../assets/images/logo.png";
import currency_arrow_down from "../assets/images/currency-arrow-down.png";
import empty_cart from "../assets/images/empty-cart.png";
import Categories from "./Categories";
import Attributes from "./Attributes";
import navigatorLeft from "../assets/images/left-arrow.png";
import navigatorRight from "../assets/images/right-arrow.png";

// The categories query...
const CATEGORIES_QUERY = gql`
  {
    categories {
      name
    }
  }
`;

const CURRENCIES_QUERY = gql`
  {
    currencies {
      label
      symbol
    }
  }
`;

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      currencyButtonClick: false,
      currentCurrencyIndex: 0,
      cartOverlayOpen: false,
      totals: [],
    };
    this.currencyButtonHandler = this.currencyButtonHandler.bind(this);
    this.calculateTotalHandler = this.calculateTotalHandler.bind(this)
    this.updateCurrencyHandler = this.updateCurrencyHandler.bind(this);
    this.checkoutHandler = this.checkoutHandler.bind(this);
    this.cartOverlayHandler = this.cartOverlayHandler.bind(this);
    this.cartOverlayBackgroundHandler =
      this.cartOverlayBackgroundHandler.bind(this);
    this.itemTotalHandler = this.itemTotalHandler.bind(this);
  }

  componentDidUpdate(prevProps) {
    if(prevProps.currencySymbol[0] !== this.props.currencySymbol[0]) {
      // Update every item price in the state...
      let grandTotal = 0
      if(this.props.cartItems && this.props.cartItems.length > 0) {
        this.state.totals.forEach((item, idx) => {
          const fixedAmount = item[this.props.currencySymbol[0]].amount
          const quantity = this.props.cartItems[idx].quantity
  
          grandTotal = this.props.getTotalHandler(fixedAmount, quantity, grandTotal, idx)
        })
      }

      this.props.setTotalHandler(grandTotal)
    }
  }

  currencyButtonHandler() {
    this.setState({ currencyButtonClick: !this.state.currencyButtonClick });
  }

  // Calculating the total for each item...
  itemTotalHandler(symbol, price, quantity) {
    return `${symbol}${(price * 100 * quantity) / 100}`;
  }

  // Calculate the total...
  calculateTotalHandler() {
    let result = 0
    this.props.cartItems.forEach(item => {
      result = ((result * 100) + (item.itemFixedPrice * 100))/100
    })

    return result
  }

  updateCurrencyHandler(e) {
    this.setState({ currencyButtonClick: false });
    this.props.currencyHandler(e);
  }

  checkoutHandler() {
    this.setState({ cartOverlayOpen: false });
  }

  cartOverlayHandler(e) {
    e.stopPropagation();
  }

  cartOverlayBackgroundHandler(e) {
    this.setState({ cartOverlayOpen: false });
  }

  render() {
    const currencyDropdownStyle = {
      display: this.state.currencyButtonClick ? "block" : "none",
    };

    // Handle attributes per item in cart...
    const cartItems = this.props.cartItems.map((item, idx) => {
      const id = item.productId;
      const attributeArray = item.attributes;
      const CART_ITEMS_QUERY = gql`
          {
              product (id: "${id}") {
                name
                brand
                gallery
                attributes {
                  name
                  type
                  items {
                    value
                  }
                }
                prices {
                  currency {
                    symbol
                  }
                  amount
                }
              }
            }
          `;
      let result = null;
      const query = (
        <Query query={CART_ITEMS_QUERY} onCompleted={data => this.setState({  totals: [ data.product.prices ] })}>
          {({ loading, data }) => {
            if (!loading) {
              const product = data.product;

              const printAttributes = product.attributes.map(
                (attribute, index) => {
                  // When type is text...
                  const attributesValueText = attribute.items.map(
                    (value, idx) => {
                      // const attrName = attribute.name.toLowerCase()
                      const selectedAttribute = {
                        background:
                          idx ===
                          attributeArray[index][attribute.name.toLowerCase()]
                            ? "#1D1F22"
                            : "white",
                        color:
                          idx ===
                          attributeArray[index][attribute.name.toLowerCase()]
                            ? "white"
                            : "#1D1F22",
                      };

                      const attributeValueTemplate = (
                        <div
                          key={idx}
                          data-attribute_idx={idx}
                          className="attribute-value-text"
                          data-attribute_key={attribute.name.toLowerCase()}
                          style={selectedAttribute}
                        >
                          {value.value}
                        </div>
                      );

                      return attributeValueTemplate;
                    }
                  );

                  // When type is swatch...
                  const attributesValueSwatch = attribute.items.map(
                    (value, idx) => {
                      const selectedAttribute = {
                        border:
                          idx ===
                          attributeArray[index][attribute.name.toLowerCase()]
                            ? "1px solid #5ECE7B"
                            : "none",
                      };
                      const attributeValueTemplate = (
                        <div
                          key={idx}
                          className="attribute-value-swatch-wrapper"
                          data-attribute_idx={idx}
                          data-attribute_key={attribute.name.toLowerCase()}
                          style={selectedAttribute}
                        >
                          <div
                            key={idx}
                            className="attribute-value-swatch"
                            style={{
                              background:
                                value.value === "#FFFFFF"
                                  ? "#D3D2D5"
                                  : value.value,
                            }}
                          ></div>
                        </div>
                      );

                      return attributeValueTemplate;
                    }
                  );

                  // Main attribute template...
                  const attributeTemplate = (
                    <Attributes
                      key={index}
                      attrName={
                        attribute.name.charAt(0).toUpperCase() +
                        attribute.name.slice(1)
                      }
                      attrType={attribute.type}
                      index={index}
                      attributesValueSwatch={attributesValueSwatch}
                      attributesValueText={attributesValueText}
                    />
                  );

                  return attributeTemplate;
                }
              );

              result = (
                <div className="cart-item-container">
                  <div className="cart-item-wrapper">
                    <div className="cart-details-container">
                      <div className="cart-details-brand">{product.brand}</div>
                      <div className="cart-details-name">{product.name}</div>
                      <div className="cart-details-price">
                        {this.itemTotalHandler(
                          this.props.currencySymbol[1],
                          product.prices[this.props.currencySymbol[0]].amount,
                          this.props.cartItems[idx].quantity
                        )}
                      </div>
                      <div className="cart-details-attributes-container">
                        {printAttributes}
                      </div>
                    </div>
                    <div className="cart-images-container">
                      <div className="cart-images-actions">
                        <div
                          className="cart-plus"
                          onClick={() => {
                            this.props.quantityPlusHandler(idx);
                          }}
                        >
                          +
                        </div>
                        <div className="cart-quantity-div">
                          {this.props.cartItems[idx].quantity}
                        </div>
                        <div
                          className="cart-minus"
                          onClick={() => {
                            this.props.quantityMinusHandler(idx);
                          }}
                        >
                          -
                        </div>
                      </div>
                      <div className="mini-cart-image-wrapper">
                        <div className="cart-images-img">
                          <img
                            src={
                              product.gallery[
                                this.props.cartItems[idx].currentImageIdx
                              ]
                            }
                            alt={product.brand}
                            className="cart-actual-image"
                          />
                        </div>
                        <div className="image-navigator-wrapper">
                          <div
                            className="image-navigator"
                            style={{
                              display:
                                product.gallery.length <= 1 ? "none" : "flex",
                            }}
                          >
                            <img
                              src={navigatorLeft}
                              alt="navigator-left"
                              onClick={() => {
                                this.props.navigateImageLeft(
                                  idx,
                                  product.gallery.length
                                );
                              }}
                            />
                            <img
                              src={navigatorRight}
                              alt="navigator-right"
                              onClick={() => {
                                this.props.navigateImageRight(
                                  idx,
                                  product.gallery.length
                                );
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );

              return result;
            } else return null;
          }}
        </Query>
      );

      return query;
    });

    return (
      <div className="header-wrapper">
        <header className="header-container">
          <div className="categories-container">
            <ul>
              <Query query={CATEGORIES_QUERY}>
                {({ loading, data }) => {
                  if (loading) return null;
                  const { categories } = data;
                  const allcategories = categories.map((category, idx) => {
                    return (
                      <Categories
                        key={idx}
                        category={category.name.toUpperCase()}
                        changeCategory={this.props.changeCategory}
                        categoryState={this.props.category}
                      />
                    );
                  });
                  return allcategories;
                }}
              </Query>
            </ul>
          </div>
          <Link
            onClick={() => {
              this.props.changeCategory("all");
            }}
            to="/category/all"
          >
            <img className="logo" src={logo} alt="logo" />
          </Link>
          <div className="top-right-buttons-container">
            <div
              className="currency-symbol-button"
              onClick={() => {
                this.currencyButtonHandler();
              }}
            >
              <div className="currency-symbol">
                {this.props.currencySymbol[1]}
              </div>
              <img src={currency_arrow_down} alt="currency arrow down" />
            </div>
            <div
              className="currency-dropdown-div"
              style={currencyDropdownStyle}
            >
              <div className="currency-absolute-dropdown">
                <ul>
                  <Query query={CURRENCIES_QUERY}>
                    {({ loading, data }) => {
                      if (loading) return null;

                      const printCurrency = data.currencies.map(
                        (currency, idx) => {
                          return (
                            <li
                              key={idx}
                              data-currindex={idx}
                              data-curr_currency={currency.symbol}
                              onClick={(e) => {
                                this.updateCurrencyHandler(e);
                              }}
                            >{`${
                              currency.symbol
                            } ${currency.label.toUpperCase()}`}</li>
                          );
                        }
                      );

                      return printCurrency;
                    }}
                  </Query>
                </ul>
              </div>
            </div>
            <div
              className="empty-cart-button"
              onClick={() => {
                this.setState({
                  cartOverlayOpen: !this.state.cartOverlayOpen,
                  currencyButtonClick: false,
                });
              }}
            >
              <img src={empty_cart} alt="empty cart" />
              <div
                className="cart-notification-container"
                style={{
                  display: this.props.cartCount <= 0 ? "none" : "block",
                }}
              >
                <div className="cart-notification">{this.props.cartCount}</div>
              </div>
            </div>

            <div
              className="cart-overlay-background-container"
              style={{ display: this.state.cartOverlayOpen ? "block" : "none" }}
            >
              <div
                className="cart-overlay-background"
                data-overlay_background={true}
                onClick={(e) => {
                  this.cartOverlayBackgroundHandler(e);
                }}
              >
                <div className="cart-overlay-wrapper">
                  <div
                    className="cart-overlay"
                    onClick={(e) => {
                      this.cartOverlayHandler(e);
                    }}
                  >
                    <div className="cart-top-items">
                      <div className="cart-overlay-title">
                        My Bag,{" "}
                        <span>{`${this.props.cartCount} ${
                          this.props.cartCount === 1 ? "item" : "items"
                        }`}</span>
                      </div>
                      <div className="cart-overlay-items-container">
                        {cartItems}
                      </div>
                    </div>
                    <div className="cart-bottom-items">
                      <div className="cart-overlay-total-container">
                        <div className="total-title">Total</div>
                        <div className="total-content">{`${this.props.currencySymbol[1]}${this.props.totalPrice}`}</div>
                      </div>
                      <div className="cart-overlay-buttons">
                        <Link
                          to="/cart"
                          onClick={() => {
                            this.checkoutHandler();
                          }}
                        >
                          <button>VIEW BAG</button>
                        </Link>
                        <button
                          onClick={() => {
                            this.props.checkout();
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
        </header>
      </div>
    );
  }
}
