import React from 'react'
import { PureComponent } from 'react';

export class CartItem extends PureComponent {
  constructor() {
    super()

    this.cartImagesDisplay = this.cartImagesDisplay.bind(this)
  }

  cartImagesDisplay( galleryLenght ) {
    return galleryLenght <= 1 ? "none" : "flex"
  }

  render() {

    const {
        product,
        currencySymbol,
        cartItems,
        idx,
        printAttributes,
        plusIcon,
        quantityHandler,
        minusIcon,
        navigatorLeft,
        navigateImage,
        navigatorRight,
        itemTotalHandler
    } = this.props

    return (
        <div className="cart-item-container">
        <div className="cart-item-wrapper">
          <div className="cart-details-container">
            <div className="cart-details-brand">{ product.brand }</div>
            <div className="cart-details-name">{ product.name }</div>
            <div className="cart-details-price">
              {itemTotalHandler(
                currencySymbol[ 1 ],
                product.prices[ currencySymbol[0] ].amount,
                cartItems[ idx ].quantity,
                idx
              )}
            </div>
            <div className="cart-details-attributes-container">
              { printAttributes }
            </div>
          </div>
          <div className="cart-images-container">
            <div className="cart-images-actions">
              <img
                src={ plusIcon }
                alt="plus-option"
                data-quantity='plus'
                onClick={ e => {
                  quantityHandler( idx, e.currentTarget.dataset.quantity );
                }}
              />
              <div className="cart-quantity-div">
                { cartItems[idx].quantity }
              </div>
              <img
                src={ minusIcon }
                alt="minus-option"
                data-quantity='minus'
                onClick={ e => {
                  quantityHandler( idx, e.currentTarget.dataset.quantity );
                }}
              />
            </div>
            <div className="cart-wrapper">
              <div className="cart-images-img">
                <img
                  src={
                    product.gallery[ cartItems[idx].currentImageIdx ]
                  }
                  alt={ product.name }
                  className="cart-actual-image"
                />
              </div>
              <div className="cart-images-wrapper">
                <div
                  className="image-navigator"
                  style={{
                    display:
                      this.cartImagesDisplay( product.gallery.length )
                  }}
                >
                  <img
                    src={ navigatorLeft }
                    alt="navigator-left"
                    data-nav='left'
                    onClick={ e => {
                      navigateImage( idx, product.gallery.length, e.currentTarget.dataset.nav );
                    }}
                  />
                  <img
                    src={ navigatorRight }
                    alt="navigator-right"
                    data-nav='right'
                    onClick={ e => {
                      navigateImage( idx, product.gallery.length, e.currentTarget.dataset.nav );
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