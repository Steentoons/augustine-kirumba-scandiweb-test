import React from "react";
import { PureComponent } from "react";

export default class Attributes extends PureComponent {
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
      <div className="attribute-wrapper">
        <div className="attribute-title">{`${attrName}:`}</div>
        <div className="attribute-contents" data-attribute_idx={index}>
          { this.getAttrType( attrType ,attributesValueSwatch, attributesValueText )}
        </div>
      </div>
    );
  }
}
