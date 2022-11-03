import React from 'react'
import { PureComponent } from 'react';

export class CartItem extends PureComponent {
  render() {

    const {
        product,
        currencySymbol,
        cartItems,
        idx,
        printAttributes,
        plusIcon,
        quantityPlusHandler,
        minusIcon,
        quantityMinusHandler,
        navigatorLeft,
        navigateImageLeft,
        navigatorRight,
        navigateImageRight,
        itemTotalHandler
    } = this.props

    return (
        <div className="cart-item-container">
        <div className="cart-item-wrapper">
          <div className="cart-details-container">
            <div className="cart-details-brand">{product.brand}</div>
            <div className="cart-details-name">{product.name}</div>
            <div className="cart-details-price">
              {itemTotalHandler(
                currencySymbol[1],
                product.prices[currencySymbol[0]].amount,
                cartItems[idx].quantity,
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
                  quantityPlusHandler(idx);
                }}
              />
              <div className="cart-quantity-div">
                {cartItems[idx].quantity}
              </div>
              <img
                src={minusIcon}
                alt="minus-option"
                onClick={() => {
                  quantityMinusHandler(idx);
                }}
              />
            </div>
            <div className="cart-wrapper">
              <div className="cart-images-img">
                <img
                  src={
                    product.gallery[cartItems[idx].currentImageIdx]
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
                      navigateImageLeft(idx, product.gallery.length);
                    }}
                  />
                  <img
                    src={navigatorRight}
                    alt="navigator-right"
                    onClick={() => {
                      navigateImageRight(idx, product.gallery.length);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default CartItem