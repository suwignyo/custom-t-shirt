import React, { Component } from "react";
import { Text } from "react-konva";
import { render } from "react-dom";

class TextLayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ""
    };
  }

  //The component waints for changes in the text,
  //it updates the text as it receives new character
  componentWillReceiveProps(newProps) {
    if (newProps.text !== this.props.text) {
      this.setState({
        text: newProps.text
      });
    }
  }

  //The onTransform function helps scale the text
  //to users needs
  handleChange = e => {
    const shape = e.target;
    this.props.onTransform({
      x: shape.x(),
      y: shape.y(),
      width: shape.width() * shape.scaleX(),
      height: shape.height() * shape.scaleY(),
      rotation: shape.rotation()
    });
  };
  render() {
    return (
      <Text
        name="text"
        offset={{
          x: -150,
          y: -150
        }}
        width={200}
        wrap="char"
        align="center"
        stroke={this.props.textColor}
        fontSize={20}
        fontFamily="Calibri"
        opacity={1}
        draggable={true}
        text={this.state.text}
        ref={node => {
          this.text = node;
        }}
        onDragEnd={this.handleChange}
        onTransformEnd={this.handleChange}
      />
    );
  }
}

export default TextLayer;
