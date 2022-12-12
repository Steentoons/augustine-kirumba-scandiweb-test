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
      cartCountHandler,
      currencySymbol,
    } = this.props;

    return (
      <BodySection
        category={category}
        currencyIdx={currencyIdx}
        cartItemsHandler={cartItemsHandler}
        cartCountHandler={cartCountHandler}
        currencySymbol={currencySymbol}
        match={match}
      />
    );
  }
}
