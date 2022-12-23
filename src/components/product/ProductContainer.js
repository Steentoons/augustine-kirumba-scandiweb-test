import React, { PureComponent } from "react";
import Product from "./Product";

export default class ProductContainer extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props,
      toCart: false,
      attributes: {},
    };

    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.plpCartHandler = this.plpCartHandler.bind(this);
    this.toCartMouseOut = this.toCartMouseOut.bind(this);
    this.instock = this.instock.bind(this);
    this.toCartFn = this.toCartFn.bind(this);
    this.cartIdsFn = this.cartIdsFn.bind(this);
    this.freshAttributes = this.freshAttributes.bind(this);
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
    const setToCart = (state) => {
      this.setState({ toCart: state });
    };

    if (product.attributes.length < 1 && product.inStock === true) {
      setToCart(true);
    } else {
      setToCart(false);
    }
  }

  toCartMouseOut = () => {
    this.setState({ toCart: false });
  }

  // The PLP cart handler...
  plpCartHandler = (e, currentProduct, productId, singleAttribute ) => {
    e.preventDefault();
    const { checkCartDuplicates } = this.props
    checkCartDuplicates(currentProduct, productId, singleAttribute)
  }

  instock = inStock => {
    return inStock ? "none" : "block";
  }

  toCartFn = toCart => {
    return toCart ? "block" : "none";
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
