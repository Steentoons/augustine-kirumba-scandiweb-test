import React from "react";
import { PureComponent } from "react";
import BodySection from "../components/BodySection";
import HeaderContainer from "../components/HeaderContainer";

export default class Homepage extends PureComponent {
  constructor( props ) {
    super( props );
    this.state = {
      currencyIndex: 0,
    };

    this.updateCurrencyHandler = this.updateCurrencyHandler.bind( this );
  }

  // Handlers...

  updateCurrencyHandler( e ) {
    const idx = Number( e.currentTarget.dataset.currindex );
    this.setState({ currencyIndex: idx });
  }

  render() {
    const {
      cartItems,
      cartCount,
      quantityHandler,
      totalPrice,
      navigateImage,
      category,
      currencySymbol,
      currencyHandler,
      checkout,
      changeCategory,
      calculateCurrencyHandler,
      getTotalHandler,
      setTotalHandler,
      cartItemsHandler,
      cartCountHandler,
      match,
    } = this.props;
    return (
      <>
        <HeaderContainer
          updateCurrencyHandler={ this.updateCurrencyHandler }
          cartItems={ cartItems }
          cartCount={ cartCount }
          quantityHandler={ quantityHandler }
          totalPrice={ totalPrice }
          navigateImage={ navigateImage }
          category={ category }
          currencySymbol={ currencySymbol }
          currencyHandler={ currencyHandler }
          checkout={ checkout }
          changeCategory={ changeCategory }
          calculateCurrencyHandler={ calculateCurrencyHandler }
          getTotalHandler={ getTotalHandler }
          setTotalHandler={ setTotalHandler }
        />
        <BodySection
          currencyIdx={ this.state.currencyIndex }
          cartItemsHandler={ cartItemsHandler }
          cartCountHandler={ cartCountHandler }
          currencySymbol={ currencySymbol }
          category={ category }
          match={ match }
        />
      </>
    );
  }
}
