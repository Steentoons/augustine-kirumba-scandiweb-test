import React, { PureComponent } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import _ from "lodash";
import "./assets/css/main.css";
import Homepage from "./pages/homepage/Homepage";
import ProductView from "./pages/productView/ProductView";
import CartContainer from "./pages/cart/CartContainer";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
});

class App extends PureComponent {
  constructor() {
    super();

    const oldState = JSON.parse(sessionStorage.getItem( "oldState" ));
    const oldCartItems = JSON.parse(sessionStorage.getItem( "oldCartItems" ));

    this.state = {
      cartItems: oldCartItems ? JSON.parse( oldCartItems?.cartItems ) : [],
      cartCount: oldState?.cartCount ?? 0,
      totalPrice: oldState?.totalPrice ?? 0,
      tax: oldState?.tax ?? 0,
      currencySymbol: oldState
        ? JSON.parse(oldState?.currencySymbol)
        : [0, "$"],
      category: "all",
    };

    // Binding Handlers...
    this.persistState = this.persistState.bind( this );
    this.persistCartItems = this.persistCartItems.bind( this );
    this.cartItemsHandler = this.cartItemsHandler.bind( this );
    this.cartCountHandler = this.cartCountHandler.bind( this );
    this.cartCountPlusMinus = this.cartCountPlusMinus.bind( this )
    this.updateCartItems = this.updateCartItems.bind( this );
    this.quantityHandler = this.quantityHandler.bind( this );
    this.updateCartItemsFromQuantity = this.updateCartItemsFromQuantity.bind( this )
    this.getTotalFromQuantity = this.getTotalFromQuantity.bind( this )
    this.updateQuantityPlusMinus = this.updateQuantityPlusMinus.bind( this ) 
    this.getFixedPrice = this.getFixedPrice.bind( this )
    this.updateCartItemsWithQuantity = this.updateCartItemsWithQuantity.bind( this )
    this.navigateImage = this.navigateImage.bind( this );
    this.navigateImageHelper = this.navigateImageHelper.bind( this );
    this.navigateImageRight = this.navigateImageRight.bind( this );
    this.navigateImageLeft = this.navigateImageLeft.bind( this );
    this.currencyHandler = this.currencyHandler.bind( this );
    this.updateCurrency = this.updateCurrency.bind( this );
    this.deleteItem = this.deleteItem.bind( this );
    this.checkout = this.checkout.bind( this );
    this.changeCategory = this.changeCategory.bind( this );
    this.getTotalHandler = this.getTotalHandler.bind( this );
    this.getGrandTotal = this.getGrandTotal.bind( this );
    this.setTotalHandler = this.setTotalHandler.bind( this );
    this.newTotalFn = this.newTotalFn.bind( this );
    this.newTotal = this.newTotal.bind( this );
    this.getTax = this.getTax.bind( this );
  }

  componentDidUpdate( prevState ) {  
    this.persistState(
      prevState.cartCount, 
      prevState.totalPrice, 
      prevState.tax, 
      prevState.currencySymbol )
      this.persistCartItems( prevState.cartItems )
  }

  persistState( prevCartCount, prevTotalPrice, prevTax, prevCurrencySymbol ) {
    const { cartCount, totalPrice, tax, currencySymbol } = this.state;
    if (
      cartCount !== prevCartCount ||
      totalPrice !== prevTotalPrice ||
      tax !== prevTax ||
      !_.isEqual( currencySymbol, prevCurrencySymbol )
    ) {
      sessionStorage.setItem(
        "oldState",
        JSON.stringify({
          cartCount,
          totalPrice,
          tax,
          currencySymbol: JSON.stringify( currencySymbol ),
        })
      );
    }
  }

  persistCartItems( prevCartItems ) {
    const { cartItems } = this.state;
    if ( !_.isEqual( cartItems, prevCartItems )) {
      sessionStorage.setItem(
        "oldCartItems",
        JSON.stringify({ cartItems: JSON.stringify(cartItems) })
      );
    }
  }

  // Changing category...
  changeCategory( currentCategory ) {
    this.setState({ category: currentCategory });
  }

  // Changing currency...
  currencyHandler( e ) {
    const newCurrency = this.updateCurrency( e );
    this.setState({ currencySymbol: newCurrency });
  }

  updateCurrency( e ) {
    const idx = Number( e.currentTarget.dataset.currindex );
    const currentCurrency = e.currentTarget.dataset.curr_currency;
    const newCurrency = [...this.state.currencySymbol];
    newCurrency[ 0 ] = idx;
    newCurrency[ 1 ] = currentCurrency;

    return newCurrency;
  }

  // Adding items to the cart...
  cartItemsHandler( product ) {
    this.updateCartItemsFromJSON( product )
    const newTotal = this.newTotal( product );
    const tax = this.getTax( newTotal );
    this.setState({ totalPrice: newTotal, tax: tax });
    this.cartCountHandler( "plus" );
  }

  updateCartItemsFromJSON ( product ) {
    const currentCartItems = this.state.cartItems;
    const newItems = [].concat( currentCartItems, product );

    this.setState({ cartItems: JSON.parse(JSON.stringify( newItems )) });
  }

  // Getting tax...
  getTax( newTotal ) {
    const tax = (( newTotal * 100 * (21 / 100 )) / 100).toFixed(2);

    return tax
  }

  newTotal( product ) {
    const { currencySymbol } = this.state;
    const newTotal =
      (( this.state.totalPrice * 100 +
        product.itemFixedPrice[ currencySymbol[0]].amount * 100 ) /
      100).toFixed(2);

    return newTotal;
  }

  // Adding individual item quantity to the cart...
  cartCountHandler( duty ) {
    console.log('got ourselves a winner at last?')
    this.setState( prev => this.cartCountPlusMinus ( prev, duty )); 
  }

  cartCountPlusMinus ( prev, duty ) {
    if ( duty === "plus" )
      return { cartCount: prev.cartCount + 1 };
    else if ( duty === "minus" ) 
      return { cartCount: prev.cartCount - 1 };
  }

  // Calculating the grand total after currency change...
  getTotalHandler( fixedAmount, quantity, grandTotal, idx ) {
    const newCartItems = this.updateCartItems( idx, fixedAmount );
    this.setState({ cartItems: newCartItems });
    this.getGrandTotal( fixedAmount, quantity, grandTotal );

    return grandTotal;
  }

  getGrandTotal( fixedAmount, quantity, grandTotal ) {
    const itemPrice = (fixedAmount * quantity * 100) / 100;
    grandTotal = (grandTotal * 100 + itemPrice * 100) / 100;

    return grandTotal;
  }

  updateCartItems( idx, fixedAmount ) {
    const { currencySymbol } = this.state;
    const newCartItems = [...this.state.cartItems];
    const item = { ...newCartItems[idx] };
    item.itemFixedPrice[currencySymbol[0]].amount = fixedAmount;
    newCartItems[ idx ] = item;

    return newCartItems;
  }

  // Setting the total to state after currency change...
  setTotalHandler( grandTotal ) {
    this.setState({ totalPrice: grandTotal });
  }

  // Ordering and clearing cart...
  checkout() {
    this.setState({ cartItems: [], cartCount: 0, totalPrice: 0, tax: 0 });
  }

  // Adding and reducing quantity to the cart...
  quantityHandler( idx, quantity ) {
    const { cartItem, fixedPrice } = this.updateCartItemsWithQuantity( idx )
    const newTotal = this.updateQuantityPlusMinus( quantity, cartItem, idx, fixedPrice )
    const tax = this.getTax( newTotal );
    this.setState({ totalPrice: newTotal, tax: tax });
  }

  updateQuantityPlusMinus( quantity, cartItem, idx, fixedPrice ) {
    let newTotal = 0;
    if ( quantity === "plus" ) {
      cartItem.quantity = this.state.cartItems[ idx ].quantity + 1;

      return this.getTotalFromQuantity( quantity, fixedPrice, newTotal )
    } else if ( quantity === "minus" ) {
      if (this.state.cartItems[ idx ].quantity > 0) {
        cartItem.quantity = this.state.cartItems[ idx ].quantity - 1;
        if ( cartItem.quantity === 0 )
          this.deleteItem( idx );

        return this.getTotalFromQuantity( quantity, fixedPrice, newTotal )
      }
    }
  }

  getTotalFromQuantity ( quantity, fixedPrice, total ) {
    this.cartCountHandler( quantity );
    total = this.newTotalFn( quantity, fixedPrice );

    return total
  }

  newTotalFn( quantity, fixedPrice ) {
    const totalPrice = this.state.totalPrice * 100;
    if ( quantity === "minus" )
      return (( totalPrice - fixedPrice ) / 100).toFixed(2);
    else if ( quantity === "plus" )
      return (( totalPrice + fixedPrice ) / 100).toFixed(2);
  }

  // Updating the cart items with the quantity...
  updateCartItemsWithQuantity ( idx ) {
    const fixedPrice = this.getFixedPrice( idx )
    const cartItem = this.updateCartItemsFromQuantity( idx, fixedPrice )

    return { cartItem, fixedPrice }
  }

  updateCartItemsFromQuantity( idx, fixedPrice ) {
    const newCartItems = [...this.state.cartItems];
    const cartItem = { ...newCartItems[ idx ] };
    cartItem.itemTotalPrice = ( fixedPrice * 100 * cartItem.quantity ) / 100;
    newCartItems[idx] = cartItem;
    this.setState({ cartItems: newCartItems });

    return cartItem
  }

  getFixedPrice( idx ) {
    const { currencySymbol } = this.state;
    const fixedPrice = this.state.cartItems[ idx ].itemFixedPrice[ currencySymbol[0] ].amount * 100;

    return fixedPrice
  }

  // Deleting items from the cart...
  deleteItem( idx ) {
    const items = [...this.state.cartItems ];
    for (let i = 0; i < items.length; i++) {
      if ( i === idx )
        items.splice( i, 1 );
    }

    this.setState({ cartItems: items });
  }

  

  // Navigate displayed image to the right and left...
  navigateImage( idx, length, nav ) {
    const newCartItems = this.navigateImageHelper( idx, nav, length )

    this.setState({ cartItems: newCartItems });
  }

  navigateImageHelper( idx, nav, length ) {
    const currentIdx = this.state.cartItems[idx].currentImageIdx;
    const items = [...this.state.cartItems ];
    const item = { ...items[idx] };

    if ( nav === "left" ) 
      return this.navigateImageLeft( currentIdx, length, item, items, idx ) 
    else if ( nav === "right" ) 
      return this.navigateImageRight( currentIdx, length, item, items, idx )
  }

  navigateImageRight( currentIdx, length, item, rightItem, idx ) {
    if ( currentIdx !== length - 1 )
      item.currentImageIdx = currentIdx + 1;
    else if ( currentIdx === length - 1 )
      item.currentImageIdx = 0;
    rightItem[ idx ] = item;

    return rightItem
  }

  navigateImageLeft( currentIdx, length, item, leftItem, idx ) {
    if ( currentIdx > 0 )
      item.currentImageIdx = currentIdx - 1;
    else if ( currentIdx === 0 )
      item.currentImageIdx = length - 1;
    leftItem[ idx ] = item;

    return leftItem
  }

  render() {
    return (
      <Router>
        <ApolloProvider client={ client }>
          <div className="container">
            <Switch>
              <Route exact path="/">
                <Redirect to="/category/all" />
              </Route>
              <Route
                exact
                path="/category/:category"
                render={ props => (
                  <Homepage
                    {...props}
                    cartItems={ this.state.cartItems }
                    cartCount={ this.state.cartCount }
                    quantityHandler={ this.quantityHandler }
                    navigateImage={ this.navigateImage }
                    totalPrice={ this.state.totalPrice }
                    cartItemsHandler={ this.cartItemsHandler }
                    cartCountHandler={ this.cartCountHandler }
                    currencySymbol={ this.state.currencySymbol }
                    currencyHandler={ this.currencyHandler }
                    checkout={ this.checkout }
                    changeCategory={ this.changeCategory }
                    category={ this.state.category }
                    getTotalHandler={ this.getTotalHandler }
                    setTotalHandler={ this.setTotalHandler }
                  />
                )}
              ></Route>
              <Route
                exact
                path="/product/:id"
                render={ props => (
                  <ProductView
                    {...props }
                    cartItemsHandler={ this.cartItemsHandler }
                    cartItems={ this.state.cartItems }
                    cartCount={ this.state.cartCount }
                    cartCountHandler={ this.cartCountHandler }
                    quantityHandler={ this.quantityHandler }
                    totalPrice={ this.state.totalPrice }
                    navigateImage={ this.navigateImage }
                    currencySymbol={ this.state.currencySymbol }
                    currencyHandler={ this.currencyHandler }
                    checkout={ this.checkout }
                    changeCategory={ this.changeCategory }
                    getTotalHandler={ this.getTotalHandler }
                    setTotalHandler={ this.setTotalHandler }
                  />
                )}
              />
              <Route
                exact
                path="/cart"
                render={ props => (
                  <CartContainer
                    {...props }
                    cartItems={ this.state.cartItems }
                    cartCount={ this.state.cartCount }
                    quantityHandler={ this.quantityHandler }
                    totalPrice={ this.state.totalPrice }
                    navigateImage={ this.navigateImage }
                    tax={ this.state.tax }
                    currencySymbol={ this.state.currencySymbol }
                    currencyHandler={ this.currencyHandler }
                    checkout={ this.checkout }
                    changeCategory={ this.changeCategory }
                    getTotalHandler={ this.getTotalHandler }
                    setTotalHandler={ this.setTotalHandler }
                    getTax={this.getTax}
                  />
                )}
              />
            </Switch>
          </div>
        </ApolloProvider>
      </Router>
    );
  }
}

export default App;
