import { gql } from "apollo-boost";

// The categories query...
const CATEGORIES_QUERY = gql `
  {
    categories {
      name
    }
  }
`;

const CURRENCIES_QUERY = gql `
  {
    currencies {
      label
      symbol
    }
  }
`;

const cart_items_query = (id) => {
    const CART_ITEMS_QUERY = gql `
  {
    query product (id: "${id}") {
      name
      brand
      gallery
      attributes {
        name
        type
        items {
          value
        }
      }
      prices {
        currency {
          symbol
        }
        amount
      }
    }
  }`;

    return CART_ITEMS_QUERY
}

const product_view_query = (id) => {
    // Product view query...
    const PRODUCT_VIEW_QUERY = gql `
    {
      product(id: "${id}") {
        name
        inStock
        gallery
        description
        brand
        inStock
        prices {
          amount
          currency {
            symbol
          }
        }
        attributes {
          name
          type
          items {
            displayValue
            value
          }
        }
      }
    }
    `;

    return PRODUCT_VIEW_QUERY
};

const product_query = (title) => {
    const PRODUCT_QUERY = gql `
  {
    category(input: {title: "${title}"}) {
      products {
        id
        name
        gallery
        inStock
        prices {
          currency {
            symbol
          }
          amount
        }
        attributes {
          name
        }
        brand
      }
    }
  }
`;

    return PRODUCT_QUERY
}

export {
    CATEGORIES_QUERY,
    CURRENCIES_QUERY,
    cart_items_query,
    product_view_query,
    product_query,
};