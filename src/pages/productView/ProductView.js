import React, { PureComponent } from "react";
import { Query } from "react-apollo";
import HeaderContainer from "../../components/header/HeaderContainer";
import ProductContentContainer from "../../components/product-content/ProductContentContainer";
import { product_view_query } from "../../lib/queries";

export default class ProductView extends PureComponent {
  constructor(props) {
    super(props);

    const { match } = this.props;
    this.state = {
      currentId: match.params.id,
    };
    this.productViewQuery = this.productViewQuery.bind(this)
  }

  productViewQuery(
    PRODUCT_VIEW_QUERY,
    history,
    cartItemsHandler,
    cartItems,
    cartCount,
    cartCountHandler,
    currencySymbol,
    quantityHandler
  ) {
    return (
      <Query query={PRODUCT_VIEW_QUERY}>
        {({ loading, data }) => {
          if (!loading) {
            const currentProduct = data?.product;
            return (
              <ProductContentContainer
                history={history}
                currentProduct={currentProduct}
                currentId={this.state.currentId}
                cartItemsHandler={cartItemsHandler}
                cartItems={cartItems}
                cartCount={cartCount}
                cartCountHandler={cartCountHandler}
                currencySymbol={currencySymbol}
                quantityHandler={quantityHandler}
              />
            );
          } else return null;
        }}
      </Query>
    );
  }

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
    } = this.props;
    const PRODUCT_VIEW_QUERY = product_view_query(this.state.currentId);

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
        {this.productViewQuery(
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
