import React, { PureComponent } from "react";
import ClickableAttributeContainer from "../clickable-attribute/ClickableAttributeContainer";
import ProductContent from "./ProductContent";
import { v4 as uuidv4 } from "uuid";
import { BLUE, WHITE } from "../../lib/constants";

export default class ProductContentContainer extends PureComponent {
  constructor() {
    super();
    this.state = {
      thumbnailId: 0,
      attributes: {},
    };
  }

  componentDidMount = () => {
    this.freshAttributes();
  }

  // Freshening the attributes...
  freshAttributes = () => {
    const { currentProduct, currentId } = this.props;
    const attributes = currentProduct.attributes;
    const attrArr = this.getAttributeArray(attributes);
    this.updateAttributes(currentId, attrArr);
  }

  updateAttributes = ( currentId, attrArr ) => {
    this.setState({
      attributes: { id: currentId, attribute: attrArr }
    })
  }

  getAttributeArray = attributes => {
    return attributes.map((attribute) => {
      const attrName = attribute.name.toLowerCase();

      return {
        [attrName]: 0,
      };
    });
  }

  // Handling them attributes...
  attributesHandler = e => {
    const currentAttributeIdx = Number(e.currentTarget.dataset.attribute_idx);
    const parentAttributeIdx = Number(
      e.currentTarget.parentElement.dataset.attribute_idx
    );
    const attributeKey = e.currentTarget.dataset.attribute_key;
    const newAttributes = this.state.attributes.attribute;
    const { currentId } = this.props;
    newAttributes[parentAttributeIdx][attributeKey] = currentAttributeIdx;
    this.updateAttributes(currentId, newAttributes); 
  }

  thumbnailHandler = e => {
    const thumbnailId = Number(e.currentTarget.dataset.thumbnail_id);

    this.setState({ thumbnailId: thumbnailId });
  }

  // Parsing the description to valid HTML...
  descToHTML = currentProduct => {
    const description = currentProduct.description;
    const parser = new DOMParser();
    return parser.parseFromString(description, "text/html")
      .body.firstChild.textContent;
  }

  // Handles the type of the attribute to return styles and values of the attribute...
  attributeTypeFn = (attribute, attributeIndex, type) => {
    return attribute.items.map((value, idx) => {
      const selectedAttribute = this.selectedAttributeFn(
        idx,
        attributeIndex,
        type
      );
      return this.attributeValueTemplate(
        idx,
        attribute,
        selectedAttribute,
        value,
        type
      );
    });
  }

  // Returns the right template for the attributes...
  attributeValueTemplate = (idx, attribute, selectedAttribute, value, type) => {
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
            background: value.value === WHITE ? BLUE : value.value,
          }}
        ></div>
      </div>
    );

    return attributeValueTemplate;
  }

  // Returns the right values to style the selected attributes...
  selectedAttributeFn = (idx, attributeIndex, type) => {
    return type
      ? {
          background: idx === attributeIndex ? "#1D1F22" : "white",
          color: idx === attributeIndex ? "white" : "#1D1F22",
        }
      : { border: idx === attributeIndex ? "1px solid #5ECE7B" : "none" };
  }

  // returns actual attributes without inner values...
  attributeTemplate = (index, name, type, swatch, text) => {
    return (
      <ClickableAttributeContainer
        key={index}
        attrName={name}
        attrType={type}
        index={index}
        attributesValueSwatch={swatch}
        attributesValueText={text}
      />
    );
  }

  getCurrentAttribute = (index, attributeName) => {
    const currAttribute = this.state.attributes.attribute;
    if (currAttribute) return currAttribute[index][attributeName];

    return null;
  }

  // Printing the thumbnails...
  printImageThumbnails = currentProduct => {
    return currentProduct.gallery.map(
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
  }

  // Handling Attributes...
  attributeFn = currentProduct => {
    return currentProduct.attributes.map((attribute, index) => {
      const attributeIndex = this.getCurrentAttribute(
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
      return this.attributeTemplate(
        index,
        attribute.name.toUpperCase(),
        attribute.type,
        attributesValueSwatch,
        attributesValueText
      );
    });
  }

  // Makes the out of stock image to show appropriately...
  instockStyle = inStock => {
    return inStock ? "none" : "block";
  }

  // Determines when the add to cart button shows from the stock state...
  instockForButton = inStock => {
    return inStock ? "block" : "none";
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
