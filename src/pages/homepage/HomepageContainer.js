import React, { PureComponent } from 'react'
import Homepage from './Homepage'

export class HomepageContainer extends PureComponent {
  constructor() {
    super();
    this.state = {
      currencyIndex: 0,
    };
  }

  // Updating the currency...
  updateCurrencyHandler = e => {
    const idx = Number( e.currentTarget.dataset.currindex );
    this.setState({ currencyIndex: idx });
  }

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
        match,
        checkCartDuplicates,
        updateAttributes
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
        updateCurrencyHandler={this.updateCurrencyHandler}
        currencyIndex={this.state.currencyIndex}
        match={match}
        checkCartDuplicates={checkCartDuplicates}
        updateAttributes={updateAttributes}
      />
    )
  }
}

export default HomepageContainer