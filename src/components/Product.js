import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../assets/css/product.css";
import circleCart from "../assets/images/circle-cart.png"

export default class Product extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props,
      toCart: false
    };

    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.plpCartHandler = this.plpCartHandler.bind(this)
  }

  // Handling the hover add to cart on PLP...
  handleMouseOver() {
    const setToCart = (state) => {
      this.setState({toCart: state})
    }
    
    if(this.props.product.attributes.length < 1 && this.props.product.inStock === true) {
      setToCart(true)
    } else {
      setToCart(false)
    }
  }

  // The PLP cart handler...
  plpCartHandler(e) {
    e.preventDefault()

    const productId = this.props.product.id
    const attributes = []
    const quantity = 1
    const itemFixedPrice = Number(this.props.product.prices[this.props.currencySymbol[0]].amount)
    const itemTotalPrice = itemFixedPrice
    const currentImageIdx = 0

    this.props.cartCountPlusHandler()
    this.props.cartItemsHandler({attributes, productId, quantity, itemFixedPrice, itemTotalPrice, currentImageIdx})
  }

  render() {
    const productImage = {
      backgroundImage: `url('${this.props.product.gallery[0]}')`,
    };
    
    return (
      <Link to={`/product/${this.props.product.id}`}>
        <div
          className="product-container"
          data-productid={this.props.product.id}
          onMouseOver={() => {this.handleMouseOver()}}
          onMouseOut={() => {this.setState({toCart: false})}}
        >
          <div className="product-image" style={productImage}></div>
          <div className="instock-container" style={{display: this.props.product.inStock ? "none" : "block"}}>
            <div className="instock-wrapper">
              <div className="instock-div">OUT OF STOCK</div>
            </div>
          </div>
          <div className="plp-add-to-cart-container" style={{display: this.state.toCart ? "block" : "none"}}>
            <div className="plp-add-to-cart" onClick={(e) => {this.plpCartHandler(e)}}>
              <img src={circleCart} alt="circle cart" />
            </div>
          </div>
          <div className="product-contents">
            <div className="product-contents-title" >{`${this.props.product.brand} ${this.props.product.name}`}</div>
            <div className="product-contents-price">{`${this.props.currencySymbol[1]}${this.props.product.prices[this.props.currencySymbol[0]].amount}`}</div>
          </div>
        </div>
      </Link>
    );
  }
}
