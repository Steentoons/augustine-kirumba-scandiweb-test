import React, { PureComponent } from "react";
import { BLOCK, FALSE, NONE, TRUE } from "../../lib/constants";
import Product from "./Product";

export default class ProductContainer extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props,
      toCart: FALSE,
      attributes: {},
    };
  }

  componentDidMount = () => {
    this.freshAttributes();
  }

  // Freshening the attributes...
  freshAttributes = () => {
    const { product, updateAttributes } = this.props;
    updateAttributes(product.id, []);
  }

  // Handling the hover add to cart on PLP...
  handleMouseOver = () => {
    const { product } = this.props;
    if (product.attributes.length < 1 && product.inStock === TRUE) {
      this.setToCart(TRUE);
    } else {
      this.setToCart(FALSE);
    }
  }

  setToCart = (state) => {
    this.setState({ toCart: state });
  };

  toCartMouseOut = () => {
    this.setState({ toCart: FALSE });
  }

  // The PLP cart handler...
  plpCartHandler = (e, currentProduct, productId, singleAttribute ) => {
    e.preventDefault();
    const { checkCartDuplicates } = this.props
    checkCartDuplicates(currentProduct, productId, singleAttribute)
  }

  instock = inStock => {
    return inStock ? NONE : BLOCK;
  }

  toCartFn = toCart => {
    return toCart ? BLOCK : NONE;
  }

  // handling the cart ids state...
  cartIdsFn = id => {
    const { cartIds } = this.state;
    const newCartId = cartIds.push(id);
    this.setState({ cartIds: [...newCartId] });
  }

  render() {
    const { product, currencySymbol, checkCartDuplicates, updateAttributes } = this.props;

    return (
      <Product
        product={product}
        currencySymbol={currencySymbol}
        handleMouseOver={this.handleMouseOver}
        toCart={this.state.toCart}
        plpCartHandler={this.plpCartHandler}
        toCartMouseOut={this.toCartMouseOut}
        toCartFn={this.toCartFn}
        instock={this.instock}
        checkCartDuplicates={checkCartDuplicates}
        updateAttributes={updateAttributes}
        singleAttribute={this.state.attributes}
      />
    );
  }
}
