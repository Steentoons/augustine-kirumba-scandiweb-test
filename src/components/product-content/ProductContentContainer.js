import React, { PureComponent } from "react";
import ClickableAttributeContainer from "../clickable-attribute/ClickableAttributeContainer";
import ProductContent from "./ProductContent";
import { v4 as uuidv4 } from "uuid";

export default class ProductContentContainer extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      thumbnailId: 0,
      attributes: {},
    };

    this.thumbnailHandler = this.thumbnailHandler.bind(this);
    this.freshAttributes = this.freshAttributes.bind(this);
    this.getAttributeArray = this.getAttributeArray.bind(this);
    this.descToHTML = this.descToHTML.bind(this);
    this.attributeTypeFn = this.attributeTypeFn.bind(this);
    this.attributeTemplate = this.attributeTemplate.bind(this);
    this.getCurrentAttribute = this.getCurrentAttribute.bind(this);
    this.printImageThumbnails = this.printImageThumbnails.bind(this);
    this.attributeFn = this.attributeFn.bind(this);
    this.selectedAttributeFn = this.selectedAttributeFn.bind(this);
    this.attributeValueTemplate = this.attributeValueTemplate.bind(this);
    this.instockStyle = this.instockStyle.bind(this);
    this.instockForButton = this.instockForButton.bind(this);
  }

  componentDidMount() {
    this.freshAttributes();
  }

  // Freshening the attributes...
  freshAttributes() {
    const { currentProduct, currentId, updateAttributes } = this.props;
    const attributes = currentProduct.attributes;
    const attrArr = this.getAttributeArray(attributes);
    updateAttributes(currentId, attrArr);
  }

  getAttributeArray(attributes) {
    const attrArr = attributes.map((attribute) => {
      const attrName = attribute.name.toLowerCase();

      return {
        [attrName]: 0,
      };
    });

    return attrArr;
  }

  // Handling them attributes...
  attributesHandler(e) {
    const currentAttributeIdx = Number(e.currentTarget.dataset.attribute_idx);
    const parentAttributeIdx = Number(
      e.currentTarget.parentElement.dataset.attribute_idx
    );
    const attributeKey = e.currentTarget.dataset.attribute_key;
    const newAttributes = this.state.attributes.attribute;
    const { currentId, updateAttributes } = this.props;
    newAttributes[parentAttributeIdx][attributeKey] = currentAttributeIdx;
    updateAttributes(currentId, newAttributes); 
  }

  thumbnailHandler(e) {
    const thumbnailId = Number(e.currentTarget.dataset.thumbnail_id);

    this.setState({ thumbnailId: thumbnailId });
  }

  // Parsing the description to valid HTML...
  descToHTML(currentProduct) {
    const description = currentProduct.description;
    const parser = new DOMParser();
    const parsedDescription = parser.parseFromString(description, "text/html")
      .body.firstChild.textContent;

    return parsedDescription;
  }

  // Handles the type of the attribute to return styles and values of the attribute...
  attributeTypeFn(attribute, attributeIndex, type) {
    const attributesValue = attribute.items.map((value, idx) => {
      const selectedAttribute = this.selectedAttributeFn(
        idx,
        attributeIndex,
        type
      );
      const attributeValueTemplate = this.attributeValueTemplate(
        idx,
        attribute,
        selectedAttribute,
        value,
        type
      );

      return attributeValueTemplate;
    });

    return attributesValue;
  }

  // Returns the right template for the attributes...
  attributeValueTemplate(idx, attribute, selectedAttribute, value, type) {
    const attributeValueTemplate = type ? (
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
    ) : (
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
  }

  // Returns the right values to style the selected attributes...
  selectedAttributeFn(idx, attributeIndex, type) {
    const selectedAttribute = type
      ? {
          background: idx === attributeIndex ? "#1D1F22" : "white",
          color: idx === attributeIndex ? "white" : "#1D1F22",
        }
      : { border: idx === attributeIndex ? "1px solid #5ECE7B" : "none" };

    return selectedAttribute;
  }

  // returns actual attributes without inner values...
  attributeTemplate(index, name, type, swatch, text) {
    const attributeTemplate = (
      <ClickableAttributeContainer
        key={index}
        attrName={name}
        attrType={type}
        index={index}
        attributesValueSwatch={swatch}
        attributesValueText={text}
      />
    );

    return attributeTemplate;
  }

  getCurrentAttribute(index, attributeName) {
    let attributeIndex = null;
    const currAttribute = this.state.attributes.attribute;
    if (currAttribute) return currAttribute[index][attributeName];

    return attributeIndex;
  }

  // Printing the thumbnails...
  printImageThumbnails(currentProduct) {
    const printImageThumbnails = currentProduct.gallery.map(
      (thumbnail, idx) => {
        return (
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
      }
    );

    return printImageThumbnails;
  }

  // Handling Attributes...
  attributeFn(currentProduct) {
    const attributes = currentProduct.attributes.map((attribute, index) => {
      let attributeIndex = this.getCurrentAttribute(
        index,
        attribute.name.toLowerCase()
      );
      const attributesValueText = this.attributeTypeFn(
        attribute,
        attributeIndex,
        true
      );
      const attributesValueSwatch = this.attributeTypeFn(
        attribute,
        attributeIndex,
        false
      );
      const attributeTemplate = this.attributeTemplate(
        index,
        attribute.name.toUpperCase(),
        attribute.type,
        attributesValueSwatch,
        attributesValueText
      );

      return attributeTemplate;
    });

    return attributes;
  }

  // Makes the out of stock image to show appropriately...
  instockStyle(inStock) {
    const instock = inStock ? "none" : "block";

    return instock;
  }

  // Determines when the add to cart button shows from the stock state...
  instockForButton(inStock) {
    const instock = inStock ? "block" : "none";

    return instock;
  }

  render() {
    const { currentProduct, currencySymbol, checkCartDuplicates } = this.props;
    const printImageThumbnails = this.printImageThumbnails(currentProduct);
    const parsedDescription = this.descToHTML(currentProduct);
    const attributes = this.attributeFn(currentProduct);

    return (
      <ProductContent
        printImageThumbnails={printImageThumbnails}
        currentProduct={currentProduct}
        attributes={attributes}
        currencySymbol={currencySymbol}
        parsedDescription={parsedDescription}
        thumbnailId={this.state.thumbnailId}
        instockStyle={this.instockStyle}
        instockForButton={this.instockForButton}
        checkCartDuplicates={checkCartDuplicates}
        singleAttribute={this.state.attributes}
      />
    );
  }
}
