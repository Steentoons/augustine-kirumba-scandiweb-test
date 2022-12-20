import React from 'react'
import { PureComponent } from 'react'

export class NavCartDetails extends PureComponent {
  render() {
    const {
        product,
        itemTotalHandler,
        currencySymbol,
        cartItems,
        idx,
        printAttributes
    } = this.props

    return (
        <div className="cart-details-container">
        <div className="cart-details-brand">{product.brand}</div>
        <div className="cart-details-name">{product.name}</div>
        <div className="cart-details-price">
          {itemTotalHandler(
            currencySymbol[1],
            product.prices[currencySymbol[0]].amount,
            cartItems[idx].quantity
          )}
        </div>
        <div className="cart-details-attributes-container">
          {printAttributes}
        </div>
      </div>
    )
  }
}

export default NavCartDetails