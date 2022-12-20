import React from "react";
import { PureComponent } from "react";

export default class Attributes extends PureComponent {
  render() {
    const {
      attrName,
      index,
      attrType,
      attributesValueSwatch,
      attributesValueText,
      getAttrType
    } = this.props;
    
    return (
      <div className="attribute-wrapper">
        <div className="attribute-title">{`${attrName}:`}</div>
        <div className="attribute-contents" data-attribute_idx={index}>
          { getAttrType( attrType ,attributesValueSwatch, attributesValueText )}
        </div>
      </div>
    );
  }
}
