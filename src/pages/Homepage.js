import React, { Component } from "react";
import BodySection from "../components/BodySection";
import Header from "../components/Header";

export default class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "all",
      currencyIndex: 0,
    };

    this.changeCategory = this.changeCategory.bind(this);
    this.updateCurrencyHandler = this.updateCurrencyHandler.bind(this);
  }

  // Handlers...
  changeCategory(currentCategory) {
    this.setState({ category: currentCategory });
  }

  updateCurrencyHandler(e) {
    const idx = Number(e.currentTarget.dataset.currindex);
    this.setState({ currencyIndex: idx });
  }

  render() {
    console.log(this.props.cartItems);
    return (
      <>
        <Header
          changeCategory={this.changeCategory}
          updateCurrencyHandler={this.updateCurrencyHandler}
          cartItems={this.props.cartItems}
          cartCount={this.props.cartCount}
          quantityMinusHandler={this.props.quantityMinusHandler}
          quantityPlusHandler={this.props.quantityPlusHandler}
          totalPrice={this.props.totalPrice}
          navigateImageRight={this.props.navigateImageRight}
          navigateImageLeft={this.props.navigateImageLeft}
        />
        <BodySection
          category={this.state.category}
          currencyIdx={this.state.currencyIndex}
        />
      </>
    );
  }
}
