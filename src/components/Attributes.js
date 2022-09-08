 import React, { Component } from 'react'
 
 export default class Attributes extends Component {
   render() {
     return (
        <div className='attribute-wrapper'>
        <div className='attribute-title'>{`${this.props.attrName}:`}</div>
        <div className='attribute-contents' data-attribute_idx={this.props.index}>{this.props.attrType === "swatch" ? this.props.attributesValueSwatch : this.props.attributesValueText}</div>
      </div>
     )
   }
 }
 