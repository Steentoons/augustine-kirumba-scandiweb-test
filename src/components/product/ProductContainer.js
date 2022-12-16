import React, { PureComponent } from "react";
import Product from "./Product";

export default class ProductContainer extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props,
      toCart: false,
    };

    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.plpCartHandler = this.plpCartHandler.bind(this);
    this.toCartMouseOut = this.toCartMouseOut.bind(this);
  }

  // Handling the hover add to cart on PLP...
  handleMouseOver() {
    const { product } = this.props;
    const setToCart = (state) => {
      this.setState({ toCart: state });
    };

    if (product.attributes.length < 1 && product.inStock === true) {
      setToCart(true);
    } else {
      setToCart(false);
    }
  }

  toCartMouseOut() {
    this.setState({ toCart: false });
  }

  // The PLP cart handler...
  plpCartHandler(e) {
    e.preventDefault();
    const { cartCountHandler, cartItemsHandler, product, currencySymbol } =
      this.props;
    const productId = product.id;
    const attributes = [];
    const quantity = 1;
    const currentImageIdx = 0;

    cartCountHandler();
    cartItemsHandler({
      attributes,
      productId,
      quantity,
      itemFixedPrice: Number(product.prices[currencySymbol[0]].amount),
      itemTotalPrice: Number(product.prices[currencySymbol[0]].amount),
      currentImageIdx,
    });
  }

  render() {
    const { product, currencySymbol } = this.props;

    return (
      <Product
        product={product}
        currencySymbol={currencySymbol}
        handleMouseOver={this.handleMouseOver}
        toCart={this.state.toCart}
        plpCartHandler={this.plpCartHandler}
        toCartMouseOut={this.toCartMouseOut}
      />
    );
  }
}
