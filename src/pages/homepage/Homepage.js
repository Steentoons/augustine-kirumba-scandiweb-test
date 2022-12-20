import React from "react";
import { PureComponent } from "react";
import BodySectionContainer from "../../components/body-section/BodySectionContainer";
import HeaderContainer from "../../components/header/HeaderContainer";

export default class Homepage extends PureComponent {
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
      updateCurrencyHandler,
      currencyIndex,
      match,
      cartCountHandler,
      checkCartDuplicates,
      updateAttributes
    } = this.props;
    
    return (
      <>
        <HeaderContainer
          updateCurrencyHandler={ updateCurrencyHandler }
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
        <BodySectionContainer
          currencyIdx={ currencyIndex }
          cartItemsHandler={ cartItemsHandler }
          currencySymbol={ currencySymbol }
          category={ category }
          match={ match }
          cartCountHandler={ cartCountHandler }
          checkCartDuplicates={checkCartDuplicates}
          updateAttributes={updateAttributes}
        />
      </>
    );
  }
}
