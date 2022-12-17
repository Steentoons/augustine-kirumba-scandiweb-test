import React, { PureComponent } from 'react'
import BodySection from './BodySection'
import ProductContainer from "../product/ProductContainer";
import { Query } from "react-apollo";

export class BodySectionContainer extends PureComponent {
    constructor() {
        super();
    
        this.productQuery = this.productQuery.bind(this);
        this.printProducts = this.printProducts.bind(this);
        this.capitalizeFirstLetter = this.capitalizeFirstLetter.bind(this);
      }
    
      // The product query...
      productQuery(PRODUCT_QUERY, currencyIdx, cartItemsHandler, currencySymbol) {
        const productQuery = (
          <Query query={PRODUCT_QUERY}>
            {({ loading, data }) => {
              if (loading) return null;
              const allProducts = this.printProducts(
                data,
                currencyIdx,
                cartItemsHandler,
                currencySymbol
              );
    
              return allProducts;
            }}
          </Query>
        );
    
        return productQuery;
      }
    
      // Returns the product component...
      printProducts(data, currencyIdx, cartItemsHandler, currencySymbol) {
        const { cartCountHandler } = this.props
        const allProducts = data.category.products.map((product, idx) => {
          return (
            <ProductContainer
              key={idx}
              product={product}
              currencyIdx={currencyIdx}
              cartItemsHandler={cartItemsHandler}
              currencySymbol={currencySymbol}
              cartCountHandler={cartCountHandler}
            />
          );
        });
    
        return allProducts;
      }
    
      // Capitalizes the first letter of the category title...
      capitalizeFirstLetter(category) {
        return category.charAt(0).toUpperCase() + category.slice(1);
      }

  render() {
    const { category, currencyIdx, cartItemsHandler, currencySymbol, match } =
      this.props;

    return (
      <BodySection
        currencyIdx={ currencyIdx }
        cartItemsHandler={ cartItemsHandler }
        currencySymbol={ currencySymbol }
        category={ category }
        match={ match }
        productQuery={this.productQuery}
        capitalizeFirstLetter={this.capitalizeFirstLetter}
      />
    )
  }
}

export default BodySectionContainer