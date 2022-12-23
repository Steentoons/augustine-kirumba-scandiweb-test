import React, { PureComponent } from "react";
import { FLEX, IMG_DIRECTION, NONE } from "../../lib/constants";
import NavCartImg from "./NavCartImg";

export class NavCartImgContainer extends PureComponent {
  galleryLength = (galleryLength) => {
    return galleryLength <= 1 ? NONE : FLEX;
  };

  navigateImageFn = (direction, idx, product) => {
    const { navigateImage } = this.props;
    return (
      <img
        src={IMG_DIRECTION[direction].src}
        alt={IMG_DIRECTION[direction].alt}
        data-nav={direction}
        onClick={(e) => {
          navigateImage(idx, product, e.currentTarget.dataset.nav);
        }}
      />
    );
  };

  render() {
    const {
      quantityHandler,
      idx,
      cartItems,
      product,
      navigatorLeft,
      navigateImage,
      navigatorRight,
    } = this.props;

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
        navigateImageFn={this.navigateImageFn}
      />
    );
  }
}

export default NavCartImgContainer;
