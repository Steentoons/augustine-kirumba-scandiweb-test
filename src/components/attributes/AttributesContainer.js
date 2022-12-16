import React, { PureComponent } from 'react'
import Attributes from './Attributes'

export class AttributesContainer extends PureComponent {
  constructor() {
    super()

    this.getAttrType = this.getAttrType.bind(this)
  }

  getAttrType( attrType ,attributesValueSwatch, attributesValueText ) {
    const currAttrType = attrType === "swatch" ? attributesValueSwatch : attributesValueText

    return currAttrType
  }
  render() {
    const {
        attrName,
        index,
        attrType,
        attributesValueSwatch,
        attributesValueText,
      } = this.props;

    return (
      <Attributes
        attrName={attrName}
        attrType={attrType}
        index={index}
        attributesValueSwatch={attributesValueSwatch}
        attributesValueText={attributesValueText}
        getAttrType={this.getAttrType}
      />
    )
  }
}

export default AttributesContainer