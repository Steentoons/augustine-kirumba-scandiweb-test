import React, { Component } from "react";
import BodySection from "../components/BodySection";
import Header from "../components/Header";

export default class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currencyIndex: 0,
    };

    this.updateCurrencyHandler = this.updateCurrencyHandler.bind(this);
  }

  // Handlers...
  

  updateCurrencyHandler(e) {
    const idx = Number(e.currentTarget.dataset.currindex);
    this.setState({ currencyIndex: idx });
  }

  render() {
    return (
      <>
        <Header
          updateCurrencyHandler={this.updateCurrencyHandler}
          cartItems={this.props.cartItems}
          cartCount={this.props.cartCount}
          quantityMinusHandler={this.props.quantityMinusHandler}
          quantityPlusHandler={this.props.quantityPlusHandler}
          totalPrice={this.props.totalPrice}
          navigateImageRight={this.props.navigateImageRight}
          navigateImageLeft={this.props.navigateImageLeft}
          category={this.props.category}
          currencySymbol={this.props.currencySymbol}
          currencyHandler={this.props.currencyHandler}
          checkout={this.props.checkout}
          changeCategory={this.props.changeCategory}
        />
        <BodySection
          currencyIdx={this.state.currencyIndex}
          cartItemsHandler={this.props.cartItemsHandler}
          cartCountPlusHandler={this.props.cartCountPlusHandler}
          currencySymbol={this.props.currencySymbol}
          category={this.props.category}
        />
      </>
    );
  }
}
