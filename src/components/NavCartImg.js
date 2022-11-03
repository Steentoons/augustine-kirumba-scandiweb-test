import React from 'react'
import { PureComponent } from 'react';

export class NavCartImg extends PureComponent {
  render() {
    const {
        quantityPlusHandler,
        idx,
        cartItems,
        quantityMinusHandler,
        product,
        navigatorLeft,
        navigateImageLeft,
        navigatorRight,
        navigateImageRight
    } = this.props
    return (
        <div className="cart-images-container">
        <div className="cart-images-actions">
          <div
            className="cart-plus"
            onClick={() => {
              quantityPlusHandler(idx);
            }}
          >
            +
          </div>
          <div className="cart-quantity-div">
            {cartItems[idx].quantity}
          </div>
          <div
            className="cart-minus"
            onClick={() => {
              quantityMinusHandler(idx);
            }}
          >
            -
          </div>
        </div>
        <div className="mini-cart-image-wrapper">
          <div className="cart-images-img">
            <img
              src={
                product.gallery[cartItems[idx].currentImageIdx]
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
    )
  }
}

export default NavCartImg