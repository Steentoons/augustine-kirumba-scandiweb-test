import React, { PureComponent } from "react";
import Header from "./Header";
import CartItemsQuery from "./CartItemsQuery";
import { CATEGORIES_QUERY, CURRENCIES_QUERY } from "../lib/queries";

export default class HeaderContainer extends PureComponent {
    constructor() {
        super();
        this.state = {
            currencyButtonClick: false,
            currentCurrencyIndex: 0,
            cartOverlayOpen: false,
            totals: 0,
        };
        this.currencyButtonHandler = this.currencyButtonHandler.bind(this);
        this.calculateTotalHandler = this.calculateTotalHandler.bind(this);
        this.updateCurrencyHandler = this.updateCurrencyHandler.bind(this);
        this.checkoutHandler = this.checkoutHandler.bind(this);
        this.cartOverlayHandler = this.cartOverlayHandler.bind(this);
        this.cartOverlayBackgroundHandler =
            this.cartOverlayBackgroundHandler.bind(this);
        this.itemTotalHandler = this.itemTotalHandler.bind(this);
        this.cartOverlayActionHandler = this.cartOverlayActionHandler.bind(this);
    }

    componentDidUpdate(prevProps) {
        const { currencySymbol, cartItems, setTotalHandler } = this.props;
        if (prevProps.currencySymbol[0] !== currencySymbol[0]) {
            // Update every item price in the state...
            let grandTotal = 0;
            if (cartItems && cartItems.length > 0) {
                cartItems.forEach((item, idx) => {
                    const newItemFixedTotal =
                        item.itemFixedPrice[currencySymbol[0]].amount;
                    const itemTotal = (newItemFixedTotal * item.quantity * 100) / 100;

                    grandTotal += itemTotal;
                });
            }

            setTotalHandler(grandTotal);
        }
    }

    currencyButtonHandler() {
        this.setState({ currencyButtonClick: !this.state.currencyButtonClick });
    }

    // Calculating the total for each item...
    itemTotalHandler(symbol, price, quantity) {
        return `${symbol}${(price * 100 * quantity) / 100}`;
    }

    // Calculate the total...
    calculateTotalHandler() {
        const { cartItems } = this.props;
        let result = 0;
        cartItems.forEach((item) => {
            result = (result * 100 + item.itemFixedPrice * 100) / 100;
        });

        return result;
    }

    updateCurrencyHandler(e) {
        const { currencyHandler } = this.props;
        this.setState({ currencyButtonClick: false });
        currencyHandler(e);
    }

    checkoutHandler() {
        this.setState({ cartOverlayOpen: false });
    }

    cartOverlayHandler(e) {
        e.stopPropagation();
    }

    cartOverlayBackgroundHandler(e) {
        this.setState({ cartOverlayOpen: false });
    }

    cartOverlayActionHandler() {
        this.setState({
            cartOverlayOpen: !this.state.cartOverlayOpen,
            currencyButtonClick: false,
        });
    }

    render() {
        const {
            cartItems,
            currencySymbol,
            quantityHandler,
            navigateImage,
            changeCategory,
            cartCount,
            totalPrice,
            checkout,
            category,
        } = this.props;

        const currencyDropdownStyle = {
            display: this.state.currencyButtonClick ? "block" : "none",
        };

        // Handle attributes per item in cart...
        const printCartItems = cartItems.map((item, idx) => {
            const id = item.productId;
            const attributeArray = item.attributes;

            let result = null;
            const query = ( <
                CartItemsQuery key = { idx }
                id = { id }
                attributeArray = { attributeArray }
                currencySymbol = { currencySymbol }
                cartItems = { cartItems }
                quantityHandler = { quantityHandler }
                idx = { idx }
                navigateImage = { navigateImage }
                result = { result }
                itemTotalHandler = { this.itemTotalHandler }
                setTotalHandler = { this.setTotalHandler }
                item = { item.attributes.attribute }
                />
            );

            return query;
        });

        return ( <
            Header CATEGORIES_QUERY = { CATEGORIES_QUERY }
            changeCategory = { changeCategory }
            category = { category }
            currencySymbol = { currencySymbol }
            currencyDropdownStyle = { currencyDropdownStyle }
            CURRENCIES_QUERY = { CURRENCIES_QUERY }
            cartCount = { cartCount }
            printCartItems = { printCartItems }
            totalPrice = { totalPrice }
            checkout = { checkout }
            cartOverlayOpen = { this.state.cartOverlayOpen }
            cartOverlayActionHandler = { this.cartOverlayActionHandler }
            cartOverlayBackgroundHandler = { this.cartOverlayBackgroundHandler }
            cartOverlayHandler = { this.cartOverlayHandler }
            updateCurrencyHandler = { this.updateCurrencyHandler }
            currencyButtonHandler = { this.currencyButtonHandler }
            checkoutHandler = { this.checkoutHandler }
            />
        );
    }
}