import React, { PureComponent } from "react";
import { Query } from "react-apollo";
import HeaderContainer from "../components/HeaderContainer";
import ProductContentContainer from "../components/ProductContentContainer";
import { product_view_query } from "../lib/queries";

export default class ProductView extends PureComponent {
  constructor(props) {
    super(props);

    const { match } = this.props;
    this.state = {
      currentId: match.params.id,
    };
  }
  render() {
    const {
      cartItems,
      cartCount,
      quantityMinusHandler,
      quantityPlusHandler,
      totalPrice,
      navigateImageRight,
      navigateImageLeft,
      currencySymbol,
      currencyHandler,
      checkout,
      changeCategory,
      calculateCurrencyHandler,
      getTotalHandler,
      setTotalHandler,
      history,
      cartItemsHandler,
      cartCountPlusHandler,
      cartCountMinusHandler,
    } = this.props;

    const PRODUCT_VIEW_QUERY = product_view_query(this.state.currentId)

    return (
      <div>
        <HeaderContainer
          cartItems={cartItems}
          cartCount={cartCount}
          quantityMinusHandler={quantityMinusHandler}
          quantityPlusHandler={quantityPlusHandler}
          totalPrice={totalPrice}
          navigateImageRight={navigateImageRight}
          navigateImageLeft={navigateImageLeft}
          currencySymbol={currencySymbol}
          currencyHandler={currencyHandler}
          checkout={checkout}
          changeCategory={changeCategory}
          calculateCurrencyHandler={calculateCurrencyHandler}
          getTotalHandler={getTotalHandler}
          setTotalHandler={setTotalHandler}
        />

        <Query
          query={PRODUCT_VIEW_QUERY}
        >
          {({ loading, data }) => {
            let result = null;
            if (!loading) {
              const currentProduct = data.product;
              const currentProjectComponent = (
                <ProductContentContainer
                  history={history}
                  currentProduct={currentProduct}
                  currentId={this.state.currentId}
                  cartItemsHandler={cartItemsHandler}
                  cartItems={cartItems}
                  cartCount={cartCount}
                  cartCountPlusHandler={cartCountPlusHandler}
                  cartCountMinusHandler={cartCountMinusHandler}
                  currencySymbol={currencySymbol}
                  quantityPlusHandler={quantityPlusHandler}
                />
              );

              result = currentProjectComponent;
            } else return null;

            return result;
          }}
        </Query>
      </div>
    );
  }
}
