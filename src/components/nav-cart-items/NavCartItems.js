import React from "react";
import { PureComponent } from "react";
import navigatorLeft from "../../assets/images/left-arrow.png";
import navigatorRight from "../../assets/images/right-arrow.png";
import NavCartDetails from "../nav-cart-details/NavCartDetails";
import NavCartImgContainer from "../nav-cart-img/NavCartImgContainer";

export class NavCartItems extends PureComponent {
  render() {
    const {
      product,
      currencySymbol,
      cartItems,
      idx,
      printAttributes,
      quantityHandler,
      navigateImage,
      itemTotalHandler,
    } = this.props;

    return (
      <div className="cart-item-container">
        <div className="cart-item-wrapper">
          <NavCartDetails
            product={product}
            itemTotalHandler={itemTotalHandler}
            currencySymbol={currencySymbol}
            cartItems={cartItems}
            idx={idx}
            printAttributes={printAttributes}
          />
          <NavCartImgContainer
            quantityHandler={quantityHandler}
            idx={idx}
            cartItems={cartItems}
            product={product}
            navigatorLeft={navigatorLeft}
            navigateImage={navigateImage}
            navigatorRight={navigatorRight}
          />
        </div>
      </div>
    );
  }
}

export default NavCartItems;
