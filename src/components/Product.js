import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../assets/css/product.css";

export default class Product extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props,
    };

    this.selectProductHandler = this.selectProductHandler.bind(this);
  }

  componentDidMount() {}

  selectProductHandler(e) {
    const productId = e.currentTarget.dataset.productid;
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
          onClick={(e) => {
            this.selectProductHandler(e);
          }}
        >
          <div className="product-image" style={productImage}></div>
          <div className="product-contents">
            <div className="product-contents-title">{`${this.props.product.brand} ${this.props.product.name}`}</div>
            <div className="product-contents-price">{`${
              this.props.product.prices[this.props.currencyIdx].currency.symbol
            }${this.props.product.prices[0].amount}`}</div>
          </div>
        </div>
      </Link>
    );
  }
}
