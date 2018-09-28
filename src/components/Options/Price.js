import React, { Component } from "react";

class Price extends Component {
  price = (clothing, color, material, textColor, logoOn) => {
    let price = 0;
    if (clothing === "tshirt") {
      if (material === "heavy") {
        price += 3;
      }
      if (
        (color.r === 0 && color.g === 0 && color.b === 0) ||
        (color.r === 255 && color.g === 255 && color.b === 255)
      ) {
        price += 16.95;
      } else if (
        (color.r === 255 && color.g === 0 && color.b === 0) ||
        (color.r === 0 && color.g === 128 && color.b === 0)
      ) {
        price += 18.95;
      }
    } else if (clothing === "sweater") {
      if (
        (color.r === 0 && color.g === 0 && color.b === 0) ||
        (color.r === 255 && color.g === 255 && color.b === 255)
      ) {
        price += 28.95;
      } else if (
        (color.r === 255 && color.g === 105 && color.b === 180) ||
        (color.r === 255 && color.g === 255 && color.b === 0)
      ) {
        price += 32.95;
      }
    }
    if (textColor !== "#000000" && textColor !== "#ffffff") {
      price += 3;
    }

    if (logoOn) {
      price += 10;
    }
    return price;
  };

  render() {
    return (
      <div className="price">
        $
        {this.price(
          this.props.state.clothing,
          this.props.state.color,
          this.props.state.material,
          this.props.state.textColor,
          this.props.state.logoOn
        )}
      </div>
    );
  }
}

export default Price;
