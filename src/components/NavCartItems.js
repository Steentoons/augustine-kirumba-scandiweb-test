import React from 'react'
import { PureComponent } from 'react';
import navigatorLeft from "../assets/images/left-arrow.png";
import navigatorRight from "../assets/images/right-arrow.png";
import NavCartDetails from './NavCartDetails';
import NavCartImg from './NavCartImg';

export class NavCartItems extends PureComponent {
  render() {

    const {
        product, 
        currencySymbol,
        cartItems,
        idx,
        printAttributes,
        quantityPlusHandler,
        quantityMinusHandler,
        navigateImageLeft,
        navigateImageRight,
        itemTotalHandler
    } = this.props

    return (
        <div className="cart-item-container">
        <div className="cart-item-wrapper">
          <NavCartDetails
            product={product}
            itemTotalHandler={itemTotalHandler}
            currencySymbol={currencySymbol}
            cartItems={cartItems}
            idx={idx}
            printAttributes={printAttributes}
          />
          <NavCartImg 
            quantityPlusHandler={quantityPlusHandler}
            idx={idx}
            cartItems={cartItems}
            quantityMinusHandler={quantityMinusHandler}
            product={product}
            navigatorLeft={navigatorLeft}
            navigateImageLeft={navigateImageLeft}
            navigatorRight={navigatorRight}
            navigateImageRight={navigateImageRight}
          />
        </div>
      </div>
    )
  }
}

export default NavCartItems