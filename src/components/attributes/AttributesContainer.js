import React, { PureComponent } from 'react'
import Attributes from './Attributes'

export class AttributesContainer extends PureComponent {

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
      />
    )
  }
}

export default AttributesContainer