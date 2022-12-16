import React, { PureComponent } from 'react'
import Homepage from './Homepage'

export class HomepageContainer extends PureComponent {
  render() {
    const {
        cartItems,
        cartCount,
        setTotalHandler,
        getTotalHandler,
        category,
        changeCategory,
        checkout,
        currencySymbol,
        currencyHandler,
        cartCountHandler,
        cartItemsHandler,
        totalPrice,
        navigateImage,
        quantityHandler,
        match
    } = this.props

    return (
      <Homepage
        cartItems={ cartItems }
        cartCount={ cartCount }
        quantityHandler={ quantityHandler }
        navigateImage={ navigateImage }
        totalPrice={ totalPrice }
        cartItemsHandler={ cartItemsHandler }
        cartCountHandler={ cartCountHandler }
        currencySymbol={ currencySymbol }
        currencyHandler={ currencyHandler }
        checkout={ checkout }
        changeCategory={ changeCategory }
        category={ category }
        getTotalHandler={ getTotalHandler }
        setTotalHandler={ setTotalHandler }
        match={match}
      />
    )
  }
}

export default HomepageContainer