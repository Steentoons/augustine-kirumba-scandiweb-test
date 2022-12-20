import React from "react";
import { cart_items_query } from "../../lib/queries";
import { PureComponent } from "react";

export class CartItemsQuery extends PureComponent {
  render() {
    const {
      currencySymbol,
      cartItems,
      quantityHandler,
      idx,
      navigateImage,
      itemTotalHandler,
      id,
      item,
      cartItemsQuery
    } = this.props;
    const CART_ITEMS_QUERY = cart_items_query(id);

    return (
      <>
        {cartItemsQuery(
          CART_ITEMS_QUERY,
          currencySymbol,
          cartItems,
          quantityHandler,
          idx,
          navigateImage,
          itemTotalHandler,
          item
        )}
      </>
    );
  }
}

export default CartItemsQuery;
