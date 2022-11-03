import React, { PureComponent } from 'react'
import HeaderContainer from '../components/HeaderContainer';
import "../assets/css/cart.css";

export class Cart extends PureComponent {
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
      printCartItems
    } = this.props
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

        <div className="cart-container-wrapper">
          <div className="cart-title">CART</div>
          <div className="cart-container">{printCartItems}</div>
          <div className="total-container">
            <div className="total-border"></div>
            <div className="total-details">
              Tax 21%:
              <span>{`${currencySymbol[1]}${((totalPrice * 100) * 20)/10000}`}</span>
            </div>
            <div className="total-details">
              Quantity: <span>{cartCount}</span>
            </div>
            <div className="total-details">
              Total:
              <span>{`${currencySymbol[1]}${totalPrice}`}</span>
            </div>
            <div className="total-button">
              <button
                onClick={() => {
                  checkout();
                }}
              >
                ORDER
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Cart