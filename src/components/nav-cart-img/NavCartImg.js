import React from 'react'
import { PureComponent } from 'react';
import { LEFT, MINUS, PLUS, RIGHT } from '../../lib/constants';

export class NavCartImg extends PureComponent {
  render() {
    const {
        quantityHandler,
        idx,
        cartItems,
        product,
        navigateImageFn,
        galleryLength
    } = this.props
    return (
        <div className="cart-images-container">
        <div className="cart-images-actions">
          <div
            className="cart-plus"
            data-quantity={PLUS}
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
            data-quantity={MINUS}
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
                  galleryLength(product.gallery.length)
              }}
            >
              {navigateImageFn(LEFT, idx, product.gallery.length)}
              {navigateImageFn(RIGHT, idx, product.gallery.length)}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default NavCartImg