import React, { PureComponent } from 'react'
import { ApolloProvider } from "react-apollo";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "../../assets/css/main.css";
import HomepageContainer from "../../pages/homepage/HomepageContainer";
import ProductViewContainer from "../../pages/productView/ProductViewContainer";
import CartContainer from "../../pages/cart/CartContainer";

export class Main extends PureComponent {
  render() {
    const {
        client,
        cartItems,
        cartCount,
        quantityHandler,
        navigateImage,
        totalPrice,
        cartItemsHandler,
        cartCountHandler,
        currencySymbol,
        currencyHandler,
        checkout,
        changeCategory,
        category,
        getTotalHandler,
        setTotalHandler,
        tax,
        getTax
    } = this.props
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
                  <HomepageContainer
                    {...props}
                    cartItems={ cartItems }
                    cartCount={ cartCount }
                    quantityHandler={ quantityHandler }
                    navigateImage={ navigateImage }
                    totalPrice={ totalPrice }
                    cartItemsHandler={ cartItemsHandler }
                    cartCountHandler={ cartCountHandler }
                    currencySymbol={ currencySymbol }
                    currencyHandler={ currencyHandler }
                    checkout={ checkout }
                    changeCategory={ changeCategory }
                    category={ category }
                    getTotalHandler={ getTotalHandler }
                    setTotalHandler={ setTotalHandler }
                  />
                )}
              ></Route>
              <Route
                exact
                path="/product/:id"
                render={ props => (
                  <ProductViewContainer
                    {...props }
                    cartItemsHandler={ cartItemsHandler }
                    cartItems={ cartItems }
                    cartCount={ cartCount }
                    cartCountHandler={ cartCountHandler }
                    quantityHandler={ quantityHandler }
                    totalPrice={ totalPrice }
                    navigateImage={ navigateImage }
                    currencySymbol={ currencySymbol }
                    currencyHandler={ currencyHandler }
                    checkout={ checkout }
                    changeCategory={ changeCategory }
                    getTotalHandler={ getTotalHandler }
                    setTotalHandler={ setTotalHandler }
                  />
                )}
              />
              <Route
                exact
                path="/cart"
                render={ props => (
                  <CartContainer
                    {...props }
                    cartItems={ cartItems }
                    cartCount={ cartCount }
                    quantityHandler={ quantityHandler }
                    totalPrice={ totalPrice }
                    navigateImage={ navigateImage }
                    tax={ tax }
                    currencySymbol={ currencySymbol }
                    currencyHandler={ currencyHandler }
                    checkout={ checkout }
                    changeCategory={ changeCategory }
                    getTotalHandler={ getTotalHandler }
                    setTotalHandler={ setTotalHandler }
                    getTax={getTax}
                  />
                )}
              />
            </Switch>
          </div>
        </ApolloProvider>
      </Router>
    )
  }
}

export default Main