import React, { PureComponent } from 'react'
import NavCartImg from './NavCartImg'

export class NavCartImgContainer extends PureComponent {
  constructor() {
    super()

    this.galleryLength = this.galleryLength.bind(this)
  }

  galleryLength(galleryLength) {
    const length = galleryLength <= 1 ? "none" : "flex"

    return length
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