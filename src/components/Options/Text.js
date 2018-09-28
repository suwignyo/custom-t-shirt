import React, { Component } from "react";
import { Switch, TextField } from "@material-ui/core";
import { CirclePicker } from "react-color";

class TextAddOn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textChecked: false
    };
  }
  color = [
    "#ffffff",
    "#000000",
    "#f44336",
    "#e91e63",
    "#9c27b0",
    "#673ab7",
    "#3f51b5",
    "#2196f3",
    "#03a9f4",
    "#00bcd4",
    "#009688",
    "#4caf50",
    "#8bc34a",
    "#cddc39",
    "#ffeb3b",
    "#ffc107",
    "#ff9800",
    "#ff5722",
    "#795548",
    "#607d8b",
    "#C0C0C0",
    "#C9AE5D"
  ];

  //When text is turned on then user will be able to input and select the text color
  render() {
    return (
      <div className="text-container">
        Custom Text:
        <Switch
          checked={this.props.textOn}
          onChange={this.props.handleTextChecked("textOn")}
          value="textChecked"
        />
        {this.props.textOn ? (
          <span>
            <TextField
              autoFocus
              margin="dense"
              label="Add your custom text here"
              type="text"
              fullWidth
              value={this.props.text}
              onChange={this.props.handleTextChange}
            />
            <CirclePicker
              colors={this.color}
              onChange={color => {
                this.props.changeTextColor(color);
              }}
              width="max-width"
            />
          </span>
        ) : null}
      </div>
    );
  }
}

export default TextAddOn;
