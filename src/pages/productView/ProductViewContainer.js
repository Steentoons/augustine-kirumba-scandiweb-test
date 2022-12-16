import React, { PureComponent } from 'react'
import ProductView from './ProductView'

export class ProductViewContainer extends PureComponent {
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
        match
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
        match={ match }
      />
    )
  }
}

export default ProductViewContainer