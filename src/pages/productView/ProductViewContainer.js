import React, { PureComponent } from 'react'
import ProductView from './ProductView'
import { Query } from "react-apollo";
import ProductContentContainer from "../../components/product-content/ProductContentContainer";

export class ProductViewContainer extends PureComponent {
  constructor(props) {
    super(props);
    const { match } = this.props;
    this.state = {
      currentId: match.params.id,
    };
  }

  productViewQuery = (
    PRODUCT_VIEW_QUERY,
    history,
    cartItemsHandler,
    cartItems,
    cartCount,
    cartCountHandler,
    currencySymbol,
    quantityHandler
  ) => {
    return (
      <Query query={PRODUCT_VIEW_QUERY}>
        {({ loading, data }) => {
          if (!loading) {
            const currentProduct = data?.product;
            const { updateAttributes, checkCartDuplicates } = this.props
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
                checkCartDuplicates={checkCartDuplicates}
                updateAttributes={updateAttributes}
              />
            );
          } else return null;
        }}
      </Query>
    );
  }
  render() {

    const {
        cartItemsHandler,
        cartItems,
        cartCount,
        cartCountHandler,
        quantityHandler,
        totalPrice,
        navigateImage,
        currencySymbol,
        currencyHandler,
        checkout,
        changeCategory,
        getTotalHandler,
        setTotalHandler,
        match,
    } = this.props

    return (
      <ProductView
        cartItemsHandler={ cartItemsHandler }
        cartItems={ cartItems }
        cartCount={ cartCount }
        cartCountHandler={ cartCountHandler }
        quantityHandler={ quantityHandler }
        totalPrice={ totalPrice }
        navigateImage={ navigateImage }
        currencySymbol={ currencySymbol }
        currencyHandler={ currencyHandler }
        checkout={ checkout }
        changeCategory={ changeCategory }
        getTotalHandler={ getTotalHandler }
        setTotalHandler={ setTotalHandler }
        currentId={this.state.currentId}
        productViewQuery={this.productViewQuery}
        match={ match }
      />
    )
  }
}

export default ProductViewContainer