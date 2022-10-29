import React, { Component } from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import "../assets/css/cart.css";
import Header from "../components/Header";
import Attributes from "../components/Attributes";
import plusIcon from "../assets/images/plus-square.png";
import minusIcon from "../assets/images/minus-square.png";
import navigatorLeft from "../assets/images/left-arrow.png";
import navigatorRight from "../assets/images/right-arrow.png";

export default class Cart extends Component {
  constructor() {
    super();

    this.state = {
      quantity: 0,
    };

    this.plusHandler = this.plusHandler.bind(this);
    this.minusHandler = this.minusHandler.bind(this);
    this.itemTotalHandler = this.itemTotalHandler.bind(this)
  }

  plusHandler(idx) {
    this.setState((prev) => {
      return { quantity: prev.quantity + 1 };
    });
  }

  itemTotalHandler(symbol, price, quantity, id) {
    return (
      `${symbol}${(price * 100 * quantity)/100}`
    )
  }
  minusHandler() {}
  render() {
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
        <Query query={CART_ITEMS_QUERY}>
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
                      attrName={attribute.name.toUpperCase()}
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
                          this.props.cartItems[idx].quantity,
                          idx
                        )}
                      </div>
                      <div className="cart-details-attributes-container">
                        {printAttributes}
                      </div>
                    </div>
                    <div className="cart-images-container">
                      <div className="cart-images-actions">
                        <img
                          src={plusIcon}
                          alt="plus-option"
                          onClick={() => {
                            this.props.quantityPlusHandler(idx);
                          }}
                        />
                        <div className="cart-quantity-div">
                          {this.props.cartItems[idx].quantity}
                        </div>
                        <img
                          src={minusIcon}
                          alt="minus-option"
                          onClick={() => {
                            this.props.quantityMinusHandler(idx);
                          }}
                        />
                      </div>
                      <div className="cart-wrapper">
                        <div className="cart-images-img">
                          <img
                            src={
                              product.gallery[
                                this.props.cartItems[idx].currentImageIdx
                              ]
                            }
                            alt={product.name}
                            className="cart-actual-image"
                          />
                        </div>
                        <div className="cart-images-wrapper">
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
      <div>
        <Header
          cartItems={this.props.cartItems}
          cartCount={this.props.cartCount}
          quantityMinusHandler={this.props.quantityMinusHandler}
          quantityPlusHandler={this.props.quantityPlusHandler}
          totalPrice={this.props.totalPrice}
          navigateImageRight={this.props.navigateImageRight}
          navigateImageLeft={this.props.navigateImageLeft}
          currencySymbol={this.props.currencySymbol}
          currencyHandler={this.props.currencyHandler}
          checkout={this.props.checkout}
          changeCategory={this.props.changeCategory}
          calculateCurrencyHandler={this.props.calculateCurrencyHandler}
          getTotalHandler={this.props.getTotalHandler}
          setTotalHandler={this.props.setTotalHandler}
        />

        <div className="cart-container-wrapper">
          <div className="cart-title">CART</div>
          <div className="cart-container">{cartItems}</div>
          <div className="total-container">
            <div className="total-border"></div>
            <div className="total-details">
              Tax 21%:
              <span>{`${this.props.currencySymbol[1]}${((this.props.totalPrice * 100) * 20)/10000}`}</span>
            </div>
            <div className="total-details">
              Quantity: <span>{this.props.cartCount}</span>
            </div>
            <div className="total-details">
              Total:
              <span>{`${this.props.currencySymbol[1]}${this.props.totalPrice}`}</span>
            </div>
            <div className="total-button">
              <button
                onClick={() => {
                  this.props.checkout();
                }}
              >
                ORDER
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
