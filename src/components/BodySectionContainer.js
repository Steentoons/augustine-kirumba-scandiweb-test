import React from "react";
import { PureComponent } from "react";
import BodySection from "./BodySection";

export default class BodySectionContainer extends PureComponent {
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
      />
    );
  }
}
