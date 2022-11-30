import React from 'react'
import { PureComponent } from 'react';

export class NavCartImg extends PureComponent {
  render() {
    const {
        quantityHandler,
        idx,
        cartItems,
        product,
        navigatorLeft,
        navigateImage,
        navigatorRight,
    } = this.props
    return (
        <div className="cart-images-container">
        <div className="cart-images-actions">
          <div
            className="cart-plus"
            data-quantity='plus'
            onClick={(e) => {
              quantityHandler(idx, e.currentTarget.dataset.quantity);
            }}
          >
            +
          </div>
          <div className="cart-quantity-div">
            {cartItems[idx].quantity}
          </div>
          <div
            className="cart-minus"
            data-quantity='minus'
            onClick={(e) => {
              quantityHandler(idx, e.currentTarget.dataset.quantity);
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
                data-nav='left'
                onClick={(e) => {
                  navigateImage(idx, product.gallery.length, e.currentTarget.dataset.nav);
                }}
              />
              <img
                src={navigatorRight}
                alt="navigator-right"
                data-nav='right'
                onClick={(e) => {
                  navigateImage(idx, product.gallery.length, e.currentTarget.dataset.nav);
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