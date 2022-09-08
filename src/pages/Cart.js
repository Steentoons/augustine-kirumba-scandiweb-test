import React, { Component } from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import "../assets/css/cart.css";
import Header from "../components/Header";
import Attributes from "../components/Attributes";
import plusIcon from "../assets/images/plus-square.png";
import minusIcon from "../assets/images/minus-square.png";
import navigatorLeft from "../assets/images/left-arrow.png"
import navigatorRight from "../assets/images/right-arrow.png"

export default class Cart extends Component {
    constructor() {
        super()

        this.state = {
            quantity: 0
        }

        this.plusHandler = this.plusHandler.bind(this)
        this.minusHandler = this.minusHandler.bind(this)
    }
    componentDidMount() {
        console.log(this.props.location.state.cartCount)
    }

    plusHandler() {
        this.setState(prev => {
            return {quantity: prev.quantity + 1}
        })
    }
    minusHandler() {}
  render() {

    // Handle attributes per item in cart...
    const cartItems = this.props.location.state.cartItems.map((item, idx) => {
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
                          onClick={(e) => {
                            this.attributesHandler(e);
                          }}
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
                          onClick={(e) => {
                            this.attributesHandler(e);
                          }}
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
                        <div className="cart-details-price">{`${product.prices[0].currency.symbol}${product.prices[0].amount}`}</div>
                        <div className="cart-details-attributes-container">
                        {printAttributes}
                        </div>
                    </div>
                    <div className="cart-images-container">
                        <div className="cart-images-actions">
                        <img src={plusIcon} alt="plus-option" onClick={() => {this.plusHandler()}} />
                        <div className="cart-quantity-div">{this.state.quantity}</div>
                        <img src={minusIcon} alt="minus-option" onClick={() => {this.minusHandler()}}  />
                        </div>
                        <div
                        className="cart-images-img"
                        style={{
                            backgroundImage: `url('${product.gallery[0]}')`,
                        }}
                        >
                            <div className="image-navigator">
                                <img src={navigatorLeft} alt="navigator-left" />
                                <img src={navigatorRight} alt="navigator-right" />
                            </div>
                        </div>
                    </div>
                  </div>
                </div>
              );

              return result;
            }
          }}
        </Query>
      );

      return query;
    });

    return (
      <div>
        <Header />

        <div className="cart-container">
          <div className="cart-title">CART</div>
          <div className="cart-container">{cartItems}</div>
          <div className="total-container">
            <div className="total-border"></div>
            <div className="total-details">
              Tax 21%: <span>$42.00</span>
            </div>
            <div className="total-details">
              Quantity: <span>{this.props.location.state.cartCount}</span>
            </div>
            <div className="total-details">
              Total: <span>$200.00</span>
            </div>
            <div className="total-button">
                <button>ORDER</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
