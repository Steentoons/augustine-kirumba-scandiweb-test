import React, { PureComponent } from "react";
import CartItemsQuery from "./CartItemsQuery";
import AttributesContainer from "../attributes/AttributesContainer";
import NavCartItems from "../nav-cart-items/NavCartItems";
import { v4 as uuidv4 } from "uuid";
import { Query } from "react-apollo";

export class CartItemsQueryContainer extends PureComponent {
  constructor() {
    super();

    this.cartItemsQuery = this.cartItemsQuery.bind(this);
    this.attributeTemplate = this.attributeTemplate.bind(this);
    this.attributeType = this.attributeType.bind(this);
    this.printAttributes = this.printAttributes.bind(this);
    this.attributeValue = this.attributeValue.bind(this);
    this.selectedAttribute = this.selectedAttribute.bind(this);
  }

  cartItemsQuery(
    CART_ITEMS_QUERY,
    currencySymbol,
    cartItems,
    quantityHandler,
    idx,
    navigateImage,
    itemTotalHandler,
    item
  ) {
    return (
      <Query query={CART_ITEMS_QUERY}>
        {({ loading, data }) => {
          if (!loading) {
            const product = data.product;
            const printAttributes = this.printAttributes(product, item);

            return (
              <NavCartItems
                product={product}
                currencySymbol={currencySymbol}
                cartItems={cartItems}
                idx={idx}
                printAttributes={printAttributes}
                quantityHandler={quantityHandler}
                navigateImage={navigateImage}
                itemTotalHandler={itemTotalHandler}
              />
            );
          } else return null;
        }}
      </Query>
    );
  }

  printAttributes(product, item) {
    return product.attributes.map((attribute, index) => {
      const attributesValueText = this.attributeType(
        attribute,
        item,
        index,
        true
      );
      const attributesValueSwatch = this.attributeType(
        attribute,
        item,
        index,
        false
      );
      return this.attributeTemplate(
        attribute,
        index,
        attributesValueSwatch,
        attributesValueText
      );
    });
  }

  // Returns the selected attribute...
  selectedAttribute(idx, item, index, attribute, type) {
    const selectedAttribute = type
      ? {
          background:
            idx === item[index][attribute.name.toLowerCase()]
              ? "#1D1F22"
              : "white",
          color:
            idx === item[index][attribute.name.toLowerCase()]
              ? "white"
              : "#1D1F22",
        }
      : {
          border:
            idx === item[index][attribute.name.toLowerCase()]
              ? "1px solid #5ECE7B"
              : "none",
        };

    return selectedAttribute;
  }

  attributeValue(idx, attribute, selectedAttribute, value, type) {
    const attributeValue = type ? (
      <div
        key={uuidv4()}
        data-attribute_idx={idx}
        className="attribute-value-text"
        data-attribute_key={attribute}
        style={selectedAttribute}
      >
        {value}
      </div>
    ) : (
      <div
        key={uuidv4()}
        className="attribute-value-swatch-wrapper"
        data-attribute_idx={idx}
        data-attribute_key={attribute}
        style={selectedAttribute}
      >
        <div
          key={idx}
          className="attribute-value-swatch"
          style={{
            background: value.value === "#FFFFFF" ? "#D3D2D5" : value,
          }}
        ></div>
      </div>
    );

    return attributeValue;
  }

  // When type is swatch...
  attributeType(attribute, item, index, type) {
    return attribute.items.map((value, idx) => {
      const selectedAttribute = this.selectedAttribute(
        idx,
        item,
        index,
        attribute,
        type
      );
      return this.attributeValue(
        idx,
        attribute.name.toLowerCase(),
        selectedAttribute,
        value.value,
        type
      );
    });
  }

  // Returns main attribute template...
  attributeTemplate(
    attribute,
    index,
    attributesValueSwatch,
    attributesValueText
  ) {
    return (
      <AttributesContainer
        key={uuidv4()}
        attrName={
          attribute.name.charAt(0).toUpperCase() + attribute.name.slice(1)
        }
        attrType={attribute.type}
        index={index}
        attributesValueSwatch={attributesValueSwatch}
        attributesValueText={attributesValueText}
      />
    );
  }

  render() {
    const {
        attributeArray,
        currencySymbol,
        cartItems,
        quantityHandler,
        idx,
        navigateImage,
        itemTotalHandler,
        setTotalHandler,
        id,
        item
    } = this.props

    return (
      <CartItemsQuery
        attributeArray={attributeArray}
        currencySymbol={currencySymbol}
        cartItems={cartItems}
        quantityHandler={quantityHandler}
        idx={idx}
        navigateImage={navigateImage}
        itemTotalHandler={itemTotalHandler}
        setTotalHandler={setTotalHandler}
        id={id}
        item={item}
        cartItemsQuery={this.cartItemsQuery}
      />
    );
  }
}

export default CartItemsQueryContainer;
