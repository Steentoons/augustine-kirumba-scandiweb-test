import React from 'react'
import { PureComponent } from 'react'
 
 export default class Attributes extends PureComponent {
  constructor() {
    super()

    this.attributeContent = this.attributeContent.bind(this)
  }
  attributeContent( attrType, swatch, text ) {
    return attrType === "swatch" ? swatch : text
  }
   render() {
    const {
      attrName,
      index,
      attrType,
      attributesValueSwatch,
      attributesValueText
    } = this.props
     return (
        <div className='attribute-wrapper'>
        <div className='attribute-title'>{ `${attrName}:` }</div>
        <div className='attribute-contents' data-attribute_idx={ index }>{ this.attributeContent( attrType, attributesValueSwatch, attributesValueText ) }</div>
      </div>
     )
   }
 }