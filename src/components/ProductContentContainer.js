import React, { Component } from "react";
import ClickableAttribute from "./ClickableAttribute";
import _ from "lodash";
import ProductContent from "./ProductContent";
import { v4 as uuidv4 } from "uuid";

export default class ProductContentContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      thumbnailId: 0,
      attributes: {},
    };

    this.thumbnailHandler = this.thumbnailHandler.bind(this);
    this.cartStateHandler = this.cartStateHandler.bind(this);
    this.freshAttributes = this.freshAttributes.bind(this);
    this.checkCartDuplicates = this.checkCartDuplicates.bind(this);
    this.getCurrentData = this.getCurrentData.bind(this);
  }

  componentDidMount() {
    this.freshAttributes();
  }

  // Freshening the attributes...
  freshAttributes() {
    const { currentProduct } = this.props;
    const attributes = currentProduct.attributes;
    const atrrArray = attributes.map((attribute) => {
      const attrName = attribute.name.toLowerCase();

      return { [attrName]: 0 };
    });
    this.setState({
      attributes: { id: this.props.currentId, attribute: atrrArray },
    });
  }

  // Checking on cart duplicates...
  checkCartDuplicates() {
    const { cartItems, quantityPlusHandler } = this.props;
    const singleAttribute = this.state.attributes;
    let duplicate = false;
    if (cartItems.length === 0) {
      this.cartStateHandler();
    }
    cartItems.forEach((item, idx) => {
      if (_.isEqual(item.attributes, singleAttribute)) {
        quantityPlusHandler(idx);
        duplicate = true
      }

      if(!duplicate) {
        this.cartStateHandler();
      }

    });
  }

  // Handling them attributes...
  attributesHandler(e) {
    const currentAttributeIdx = Number(e.currentTarget.dataset.attribute_idx);
    const parentAttributeIdx = Number(
      e.currentTarget.parentElement.dataset.attribute_idx
    );
    const attributeKey = e.currentTarget.dataset.attribute_key;

    const newAttributes = this.state.attributes.attribute;
    newAttributes[parentAttributeIdx][attributeKey] = currentAttributeIdx

    this.setState({
      attributes: { id: this.props.currentId, attribute: newAttributes },
    });
  }

  thumbnailHandler(e) {
    const thumbnailId = Number(e.currentTarget.dataset.thumbnail_id);

    this.setState({ thumbnailId: thumbnailId });
  }

  getCurrentData() {
    const { currentProduct, currentId } = this.props;
    const productId = currentId;
    const newAttributes = {...this.state.attributes};
    const attributes = newAttributes;

    const quantity = 1;
    const itemFixedPrice = currentProduct.prices
    const itemTotalPrice = itemFixedPrice;
    const currentImageIdx = 0;

    return {
      attributes,
      productId,
      quantity,
      itemFixedPrice,
      itemTotalPrice,
      currentImageIdx,
    };
  }
  cartStateHandler() {
    // Setting the main cart item state to be used all over the project...
    const { cartItemsHandler } = this.props;
    const data = this.getCurrentData();
    const newData = data
    cartItemsHandler(newData);

  }

  render() {
    const { currentProduct, currencySymbol } = this.props;

    // Printing the thumbnails...
    const printImageThumbnails = currentProduct.gallery.map(
      (thumbnail, idx) => {
        const result = (
          <div
            key={idx}
            data-thumbnail={thumbnail}
            data-thumbnail_id={idx}
            onClick={(e) => {
              this.thumbnailHandler(e);
            }}
            className="product-view-thumbnail"
          >
            <img src={thumbnail} alt={thumbnail} />
          </div>
        );
        return result;
      }
    );

    // Parsing the description to valid HTML...
    const description = currentProduct.description;
    const parser = new DOMParser();
    const parsedDescription = parser.parseFromString(description, "text/html")
      .body.firstChild.textContent;

    // Handling Attributes...
    const attributes = currentProduct.attributes.map((attribute, index) => {
      const currAttribute = this.state.attributes.attribute;
      let attributeIndex = null;
      if (currAttribute) {
        attributeIndex = currAttribute[index][attribute.name.toLowerCase()];
      }

      // When type is text...
      const attributesValueText = attribute.items.map((value, idx) => {
        // const attrName = attribute.name.toLowerCase()
        const selectedAttribute = {
          background: idx === attributeIndex ? "#1D1F22" : "white",
          color: idx === attributeIndex ? "white" : "#1D1F22",
        };

        const attributeValueTemplate = (
          <div
            key={idx}
            data-attribute_idx={idx}
            className="attribute-value-text"
            data-attribute_key={attribute.name.toLowerCase()}
            style={selectedAttribute}
            onClick={(e) => {
              this.attributesHandler(e);
            }}
          >
            {value.value}
          </div>
        );

        return attributeValueTemplate;
      });

      // When type is swatch...
      const attributesValueSwatch = attribute.items.map((value, idx) => {
        const selectedAttribute = {
          border: idx === attributeIndex ? "1px solid #5ECE7B" : "none",
        };
        const attributeValueTemplate = (
          <div
            key={uuidv4()}
            className="attribute-value-swatch-wrapper"
            data-attribute_idx={idx}
            data-attribute_key={attribute.name.toLowerCase()}
            style={selectedAttribute}
            onClick={(e) => {
              this.attributesHandler(e);
            }}
          >
            <div
              key={idx}
              className="attribute-value-swatch"
              style={{
                background: value.value === "#FFFFFF" ? "#D3D2D5" : value.value,
              }}
            ></div>
          </div>
        );

        return attributeValueTemplate;
      });

      // Main attribute template...
      const attributeTemplate = (
        <ClickableAttribute
          key={index}
          attrName={attribute.name.toUpperCase()}
          attrType={attribute.type}
          index={index}
          attributesValueSwatch={attributesValueSwatch}
          attributesValueText={attributesValueText}
        />
      );

      return attributeTemplate;
    });

    return (
      <ProductContent
        printImageThumbnails={printImageThumbnails}
        currentProduct={currentProduct}
        attributes={attributes}
        currencySymbol={currencySymbol}
        parsedDescription={parsedDescription}
        checkCartDuplicates={this.checkCartDuplicates}
        thumbnailId={this.state.thumbnailId}
      />
    );
  }
}
