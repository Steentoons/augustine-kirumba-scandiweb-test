import React, { PureComponent } from 'react'
import NavCartImg from './NavCartImg'

export class NavCartImgContainer extends PureComponent {
  render() {
    const {
        quantityHandler,
        idx,
        cartItems,
        product,
        navigatorLeft,
        navigateImage,
        navigatorRight,
    } = this.props

    return (
      <NavCartImg
        quantityHandler={quantityHandler}
        idx={idx}
        cartItems={cartItems}
        product={product}
        navigatorLeft={navigatorLeft}
        navigateImage={navigateImage}
        navigatorRight={navigatorRight}
      />
    )
  }
}

export default NavCartImgContainer