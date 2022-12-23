import React, { PureComponent } from 'react'
import { FLEX, NONE } from '../../lib/constants'
import NavCartImg from './NavCartImg'

export class NavCartImgContainer extends PureComponent {
  galleryLength = (galleryLength) => {
    return galleryLength <= 1 ? NONE : FLEX
  }

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
        galleryLength={this.galleryLength}
      />
    )
  }
}

export default NavCartImgContainer