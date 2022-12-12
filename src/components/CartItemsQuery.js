import React from "react";
import { Query } from "react-apollo";
import { cart_items_query } from "../lib/queries";
import Attributes from "./Attributes";
import NavCartItems from "./NavCartItems";
import { v4 as uuidv4 } from "uuid";
import { PureComponent } from "react";

export class CartItemsQuery extends PureComponent {
  render() {
    const {
      currencySymbol,
      cartItems,
      quantityHandler,
      idx,
      navigateImage,
      itemTotalHandler,
      id,
      item,
    } = this.props;

    const CART_ITEMS_QUERY = cart_items_query( id );

    let { result } = this.props;
    return (
      <Query query={ CART_ITEMS_QUERY }>
        {({ loading, data }) => {
          if ( !loading ) {
            const product = data.product;

            const printAttributes = product.attributes.map(
              (attribute, index) => {
                // When type is text...
                const attributesValueText = attribute.items.map(
                  (value, idx) => {
                    const selectedAttribute = {
                      background:
                        idx === item[ index ][ attribute.name.toLowerCase() ]
                          ? "#1D1F22"
                          : "white",
                      color:
                        idx === item[ index ][ attribute.name.toLowerCase() ]
                          ? "white"
                          : "#1D1F22",
                    };

                    const attributeValueTemplate = (
                      <div
                        key={ uuidv4() }
                        data-attribute_idx={ idx }
                        className="attribute-value-text"
                        data-attribute_key={ attribute.name.toLowerCase() }
                        style={ selectedAttribute }
                      >
                        { value.value }
                      </div>
                    );

                    return attributeValueTemplate;
                  }
                );

                // When type is swatch...
                const attributesValueSwatch = attribute.items.map(
                  ( value, idx ) => {
                    const selectedAttribute = {
                      border:
                        idx === item[ index ][ attribute.name.toLowerCase() ]
                          ? "1px solid #5ECE7B"
                          : "none",
                    };
                    const attributeValueTemplate = (
                      <div
                        key={ uuidv4() }
                        className="attribute-value-swatch-wrapper"
                        data-attribute_idx={ idx }
                        data-attribute_key={ attribute.name.toLowerCase() }
                        style={ selectedAttribute }
                      >
                        <div
                          key={ idx }
                          className="attribute-value-swatch"
                          style={{
                            background:
                              value.value === "#FFFFFF"
                                ? "#D3D2D5"
                                : value.value,
                          }}
                        ></div>
                      </div>
                    );

                    return attributeValueTemplate;
                  }
                );

                // Main attribute template...
                const attributeTemplate = (
                  <Attributes
                    key={ uuidv4() }
                    attrName={
                      attribute.name.charAt(0).toUpperCase() +
                      attribute.name.slice(1)
                    }
                    attrType={ attribute.type }
                    index={ index }
                    attributesValueSwatch={ attributesValueSwatch }
                    attributesValueText={ attributesValueText }
                  />
                );

                return attributeTemplate;
              }
            );

            result = (
              <NavCartItems
                product={ product }
                currencySymbol={ currencySymbol }
                cartItems={ cartItems }
                idx={ idx }
                printAttributes={ printAttributes }
                quantityHandler={ quantityHandler }
                navigateImage={ navigateImage }
                itemTotalHandler={ itemTotalHandler }
              />
            );

            return result;
          } else return null;
        }}
      </Query>
    );
  }
}

export default CartItemsQuery;
