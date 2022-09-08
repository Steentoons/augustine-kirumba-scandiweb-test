import React, { Component } from 'react'
import "../assets/css/productView.css"
import Attributes from './Attributes'

export default class ProductContent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      thumbnailId: 0,
      attributes: [],
    }

    this.thumbnailHandler = this.thumbnailHandler.bind(this)
    this.cartStateHandler = this.cartStateHandler.bind(this)
  }

  componentDidMount() {
    const attributes = this.props.currentProduct.attributes
    const atrrArray = attributes.map(attribute => {
      const attrName = attribute.name.toLowerCase()
      
      return {[attrName] : 0}
    })
    this.setState({ attributes: [...atrrArray] })
  }

  // Handlers...
  attributesHandler(e) {
    const currentAttributeIdx = Number(e.currentTarget.dataset.attribute_idx)
    const parentAttributeIdx = Number(e.currentTarget.parentElement.dataset.attribute_idx)
    const attributeKey = e.currentTarget.dataset.attribute_key

    const { attributes } = this.state
    attributes[parentAttributeIdx] = {
      ...attributes[parentAttributeIdx],
      [attributeKey]: currentAttributeIdx
    }

    this.setState({attributes})
  }

  textHandler(e) {
    const currentAttributeIdx = Number(e.currentTarget.dataset.attribute_idx)
    const parentAttributeIdx = Number(e.currentTarget.parentElement.dataset.attribute_idx)
    const attributeKey = e.currentTarget.dataset.attribute_key

    const { attributes } = this.state
    attributes[parentAttributeIdx] = {
      ...attributes[parentAttributeIdx],
      [attributeKey]: currentAttributeIdx
    }

    this.setState({attributes})
  }

  thumbnailHandler(e) {
    const thumbnailId = Number(e.currentTarget.dataset.thumbnail_id)

    this.setState({ thumbnailId: thumbnailId })
  }

  cartStateHandler() {
    const history = this.props.history
    const productId = this.props.currentId
    const {attributes} = this.state
    const quantity = 0
    
    this.props.cartItemsHandler({attributes, productId, quantity})
    this.props.cartCountHandler()
    // this.props.cartCountHandler(history, attributes, productId, this.props.cartItems)
  }

  render() {
    const productImageStyle = {
        backgroundImage: `url(${this.props.currentProduct.gallery[this.state.thumbnailId]})`
    }

    // Printing the thumbnails...
    const printImageThumbnails = this.props.currentProduct.gallery.map((thumbnail, idx) => {
        const productImageThumbnail = {
            backgroundImage: `url(${thumbnail})`
        }
        const result = <div key={idx} data-thumbnail={thumbnail} data-thumbnail_id={idx} onClick={(e) => {this.thumbnailHandler(e)}} style={productImageThumbnail} className='product-view-thumbnail'></div>
        return result
    })

    // Parsing the description to valid HTML...
    const description = this.props.currentProduct.description
    const parser = new DOMParser()
    const parsedDescription = parser.parseFromString(description, "text/html").body.firstChild.textContent 


    // Handling Attributes...
    const attributes = this.props.currentProduct.attributes.map((attribute, index) => {

      const currAttribute = this.state.attributes[index]
      let attributeIndex = null;
        if(currAttribute) {
          attributeIndex = currAttribute[attribute.name.toLowerCase()]
        }

      // When type is text...
      const attributesValueText = attribute.items.map((value, idx) => {
        // const attrName = attribute.name.toLowerCase()
        const selectedAttribute = {
          background: idx === attributeIndex ? "#1D1F22" : "white",
          color: idx === attributeIndex ? "white" : "#1D1F22"
        }

        const attributeValueTemplate = <div key={idx} data-attribute_idx={idx} className='attribute-value-text'  data-attribute_key={attribute.name.toLowerCase()} style={selectedAttribute} onClick={(e) => {this.attributesHandler(e)}}>{value.value}</div>

        return attributeValueTemplate
      })

      // When type is swatch...
      const attributesValueSwatch = attribute.items.map((value, idx) => {

        const selectedAttribute = {
          border: idx === attributeIndex ? "1px solid #5ECE7B" : "none",
        }
        const attributeValueTemplate = <div className='attribute-value-swatch-wrapper' data-attribute_idx={idx} data-attribute_key={attribute.name.toLowerCase()} style={selectedAttribute} onClick={(e) => {this.attributesHandler(e)}}>
          <div key={idx} className='attribute-value-swatch' style={{background: value.value === "#FFFFFF" ? "#D3D2D5" : value.value}}></div>
        </div>

        return attributeValueTemplate
      })

      // Main attribute template...
      const attributeTemplate = <Attributes key={index} attrName={attribute.name.toUpperCase()} attrType={attribute.type} index={index} attributesValueSwatch={attributesValueSwatch} attributesValueText={attributesValueText}/>

      return attributeTemplate
    })

    return (
      <div className='product-view-container'>
        <div className='product-view-thumbnail-wrapper'>
            {printImageThumbnails}
        </div>
        <div className='product-view-image'>
            <div style={productImageStyle} className='product-view-image-div'></div>
        </div>
        <div className='product-view-details-wrapper'>
          <div className='product-view-details-brand'>{this.props.currentProduct.brand}</div>
          <div className='product-view-details-name'>{this.props.currentProduct.name}</div>
          {
            // Atributes goes here... 
          }
          {attributes}
          <div className='product-view-details-price-wrapper'>
            <div className='price-name'>PRICE: </div>
            <div className='price'>{`${this.props.currentProduct.prices[0].currency.symbol}${this.props.currentProduct.prices[0].amount}`}</div>
          </div>
          <div className='product-view-details-button'>
              <button onClick={() => {this.cartStateHandler()}}>ADD TO CART</button>
          </div>
          <div className='product-view-details-desc'>{parsedDescription}</div>
        </div>
      </div>
    )
  }
}