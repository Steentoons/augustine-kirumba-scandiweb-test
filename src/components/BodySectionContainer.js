import React, { Component } from "react";
import BodySection from "./BodySection";

export default class BodySectionContainer extends Component {
  render() {
    const {
      match,
      category,
      currencyIdx,
      cartItemsHandler,
      cartCountPlusHandler,
      currencySymbol,
    } = this.props;

    return (
      <BodySection
        category={category}
        currencyIdx={currencyIdx}
        cartItemsHandler={cartItemsHandler}
        cartCountPlusHandler={cartCountPlusHandler}
        currencySymbol={currencySymbol}
        match={match}
        // PRODUCT_QUERY={PRODUCT_QUERY}
      />
    );
  }
}
