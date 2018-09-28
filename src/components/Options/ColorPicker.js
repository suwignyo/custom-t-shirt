import React, { Component } from "react";
import { CirclePicker } from "react-color";

class ColorPicker extends Component {
  constructor(props) {
    super(props);
    this.itemColor = this.props.itemColor;
  }
  circleSize = 35;
  circleSpacing = 2;
  tshirt = ["#ffffff", "#000000", "#ff0000", "	#008000"];
  sweater = ["#ffffff", "#000000", "#ffff00", "#ff69b4"];

  //changes the color to be shown depending on the clothing type
  render() {
    return (
      <div className="color-picker">
        {this.props.clothing === "tshirt" ? (
          <CirclePicker
            id="circle-picker"
            width="max-content"
            circleSize={this.circleSize}
            colors={this.tshirt}
            onChange={color => {
              this.props.changeColor(color);
            }}
          />
        ) : (
          <CirclePicker
            id="circle-picker"
            width="max-content"
            circleSize={this.circleSize}
            colors={this.sweater}
            onChange={color => {
              this.props.changeColor(color);
            }}
          />
        )}
      </div>
    );
  }
}

export default ColorPicker;
