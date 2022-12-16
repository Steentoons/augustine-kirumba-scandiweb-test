import React, { PureComponent } from "react";
import HeaderContainer from "../../components/header/HeaderContainer";
import { product_view_query } from "../../lib/queries";

export default class ProductView extends PureComponent {
  render() {
    const {
      cartItems,
      cartCount,
      quantityHandler,
      totalPrice,
      navigateImage,
      currencySymbol,
      currencyHandler,
      checkout,
      changeCategory,
      calculateCurrencyHandler,
      getTotalHandler,
      setTotalHandler,
      history,
      cartItemsHandler,
      cartCountHandler,
      currentId,
      productViewQuery
    } = this.props;
    const PRODUCT_VIEW_QUERY = product_view_query(currentId);

    return (
      <div>
        <HeaderContainer
          cartItems={cartItems}
          cartCount={cartCount}
          quantityHandler={quantityHandler}
          totalPrice={totalPrice}
          navigateImage={navigateImage}
          currencySymbol={currencySymbol}
          currencyHandler={currencyHandler}
          checkout={checkout}
          changeCategory={changeCategory}
          calculateCurrencyHandler={calculateCurrencyHandler}
          getTotalHandler={getTotalHandler}
          setTotalHandler={setTotalHandler}
        />
        {productViewQuery(
          PRODUCT_VIEW_QUERY,
          history,
          cartItemsHandler,
          cartItems,
          cartCount,
          cartCountHandler,
          currencySymbol,
          quantityHandler
        )}
      </div>
    );
  }
}
