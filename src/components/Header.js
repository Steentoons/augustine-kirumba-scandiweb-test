import React, { Component } from 'react'
import {Query} from "react-apollo"
import gql from "graphql-tag"
import { Link } from 'react-router-dom'
import "../assets/css/header.css"
import logo from "../assets/images/logo.png"
import currency from "../assets/images/currency.png"
import currency_arrow_down from "../assets/images/currency-arrow-down.png"
import empty_cart from "../assets/images/empty-cart.png"
import Categories from './Categories'

// The categories query...
const CATEGORIES_QUERY = gql`
    {
        categories {
            name
        }
    }
`

const CURRENCIES_QUERY = gql`
    {
        currencies {
            label
            symbol
        }
    }
`

export default class Header extends Component {
    constructor() {
        super()
        this.state = {
            currencyButtonClick: false,
            currentCurrencyIndex: 0,
            cartOverlayOpen: false
        }
        this.currencyButtonHandler = this.currencyButtonHandler.bind(this)
        this.updateCurrencyHandler = this.updateCurrencyHandler.bind(this)
    }

    currencyButtonHandler() {
        this.setState({currencyButtonClick: !this.state.currencyButtonClick})
    }

    updateCurrencyHandler(e) {
        this.setState({currencyButtonClick: false })
        this.props.updateCurrencyHandler(e)
    }

  render() {

    const currencyDropdownStyle = {
        display: this.state.currencyButtonClick ? "block" : "none"
    }

    console.log(this.props)
    
    return (
      <div className="header-wrapper">
        <header className='header-container'>
        <div className='categories-container'>
            <ul>
                <Query query={CATEGORIES_QUERY}>
                    {({loading, data}) => {
                        if(loading) return "Loading";
                        const  { categories } = data
                        const allcategories = categories.map((category, idx) => {
                            return <Categories key={idx} category={category.name.toUpperCase()} changeCategory={this.props.changeCategory}/>
                        })
                        return allcategories
                    }}
                </Query>
            </ul>
        </div>
        <img className="logo" src={logo} alt="logo" />
        <div className='top-right-buttons-container'>
            <div className='currency-symbol-button' onClick={()=> {this.currencyButtonHandler()}}>
                <img src={currency} alt="currency symbol" />
                <img src={currency_arrow_down} alt="currency arrow down" />
            </div>
            <div className='currency-dropdown-div' style={currencyDropdownStyle}>
                <div className='currency-absolute-dropdown'>
                    <ul>
                        <Query query={CURRENCIES_QUERY}>
                            {({ loading, data }) => {
                                if(loading) return null;

                                const printCurrency = data.currencies.map((currency, idx) => {
                                    return <li key={idx} data-currindex={idx} onClick={(e) => {this.updateCurrencyHandler(e)}}>{`${currency.symbol} ${currency.label.toUpperCase()}`}</li>
                                })

                                return printCurrency
                            }}
                        </Query>
                    </ul>
                </div>       
            </div>
            <div className='empty-cart-button'>
                <img src={empty_cart} alt="empty cart" onClick={() => {this.setState({cartOverlayOpen: !this.state.cartOverlayOpen})}} />
            </div>
            <div className='cart-overlay-background-container' style={{display: this.state.cartOverlayOpen ? "block" : "none"}} >
                <div className='cart-overlay-background'>
                    <div className='cart-overlay-wrapper'>
                        <div className="cart-overlay">
                            <div className='cart-overlay-title'>My Bag, <span>3 items</span></div>
                            <div className='cart-overlay-items-container'>items</div>
                            <div className='cart-overlay-total-container'>
                                <div className='total-title'>Total</div>
                                <div className='total-content'>$200.00</div>
                            </div>
                            <div className='cart-overlay-buttons'>
                                <button>VIEW BAG</button>
                                <Link to="/cart"><button>CHECK OUT</button></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>                    
        </header>
      </div>
    )
  }
}
