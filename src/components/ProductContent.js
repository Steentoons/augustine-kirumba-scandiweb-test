import React from 'react'
import { PureComponent } from 'react';
import "../assets/css/productView.css";

export class ProductContent extends PureComponent {
  render() {
    const {
      printImageThumbnails,
      currentProduct,
      attributes,
      currencySymbol,
      parsedDescription,
      checkCartDuplicates,
      thumbnailId
    } = this.props

    return (
      <div className="product-view-container">
        <div className="product-view-thumbnail-wrapper">
          {printImageThumbnails}
        </div>
        <div className="product-view-image">
          <div className="product-view-image-div">
            <img
              src={currentProduct.gallery[thumbnailId]}
              alt={currentProduct.name}
            />
          </div>
          <div
            className="instock-container"
            style={{
              display: currentProduct.inStock ? "none" : "block",
            }}
          >
            <div className="instock-wrapper">
              <div className="instock-div">OUT OF STOCK</div>
            </div>
          </div>
        </div>
        <div className="product-view-details-wrapper">
          <div className="product-view-details-brand">
            {currentProduct.brand}
          </div>
          <div className="product-view-details-name">
            {currentProduct.name}
          </div>
          {
            // Atributes goes here...
          }
          {attributes}
          <div className="product-view-details-price-wrapper">
            <div className="price-name">PRICE: </div>
            <div className="price">{`${currencySymbol[1]}${
              currentProduct.prices[currencySymbol[0]]
                .amount
            }`}</div>
          </div>
          <div className="product-view-details-button">
            <button
              onClick={() => {
                if (currentProduct.inStock)
                  checkCartDuplicates();
              }}
              style={{
                display: currentProduct.inStock ? "block" : "none",
              }}
            >
              ADD TO CART
            </button>
          </div>
          <div className="product-view-details-desc">{parsedDescription}</div>
        </div>
      </div>
    )
  }
}

export default ProductContent