import React, { PureComponent } from 'react'
import { Link } from "react-router-dom";
import circleCart from "../assets/images/circle-cart.png";
import "../assets/css/product.css";

export class Product extends PureComponent {

  render() {

    const {
      product,
      currencySymbol,
      handleMouseOver,
      toCart,
      plpCartHandler,
      toCartMouseOut
    } = this.props

    return (
      <Link to={`/product/${product.id}`}>
        <div
          className="product-container"
          data-productid={product.id}
          onMouseOver={() => {
            handleMouseOver();
          }}
          onMouseOut={() => {
            toCartMouseOut()
          }}
        >
          <div className="product-image">
            <img
              src={`${product.gallery[0]}`}
              alt={`${product.brand}`}
            />
          </div>
          <div
            className="instock-container"
            style={{ display: product.inStock ? "none" : "block" }}
          >
            <div className="instock-wrapper">
              <div className="instock-div">OUT OF STOCK</div>
            </div>
          </div>
          <div
            className="plp-add-to-cart-container"
            style={{ display: toCart ? "block" : "none" }}
          >
            <div
              className="plp-add-to-cart"
              onClick={(e) => {
                plpCartHandler(e);
              }}
            >
              <img src={circleCart} alt="circle cart" />
            </div>
          </div>
          <div className="product-contents">
            <div className="product-contents-title">{`${product.brand} ${product.name}`}</div>
            <div className="product-contents-price">{`${
              currencySymbol[1]
            }${
              product.prices[currencySymbol[0]].amount
            }`}</div>
          </div>
        </div>
      </Link>
    )
  }
}

export default Product