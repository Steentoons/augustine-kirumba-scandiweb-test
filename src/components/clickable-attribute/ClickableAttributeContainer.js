import React, { PureComponent } from "react";
import ClickableAttribute from "./ClickableAttribute";

export class ClickableAttributeContainer extends PureComponent {
  constructor() {
    super();

    this.attributeContent = this.attributeContent.bind(this);
  }
  attributeContent(attrType, swatch, text) {
    return attrType === "swatch" ? swatch : text;
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
      <ClickableAttribute
        attrName={attrName}
        attrType={attrType}
        index={index}
        attributesValueSwatch={attributesValueSwatch}
        attributesValueText={attributesValueText}
        attributeContent={this.attributeContent}
      />
    );
  }
}

export default ClickableAttributeContainer;
