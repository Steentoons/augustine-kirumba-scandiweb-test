import React, { PureComponent } from "react";
import CartItemsQuery from "./CartItemsQuery";

export class CartItemsQueryContainer extends PureComponent {
  render() {
    const {
        attributeArray,
        currencySymbol,
        cartItems,
        quantityHandler,
        idx,
        navigateImage,
        itemTotalHandler,
        setTotalHandler,
        id,
        item
    } = this.props

    return (
      <CartItemsQuery
        attributeArray={attributeArray}
        currencySymbol={currencySymbol}
        cartItems={cartItems}
        quantityHandler={quantityHandler}
        idx={idx}
        navigateImage={navigateImage}
        itemTotalHandler={itemTotalHandler}
        setTotalHandler={setTotalHandler}
        id={id}
        item={item}
      />
    );
  }
}

export default CartItemsQueryContainer;
