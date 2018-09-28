import React, { Component } from "react";
import { Image } from "react-konva";
import { render } from "react-dom";
import Konva from "konva";
import tshirt from "../../img/tshirt.png";

class TShirt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null
    };
  }

  componentDidUpdate() {
    //image needs to be cached to display changes
    this.shirt.cache();
    this.shirt.blue(this.props.color.b);
    this.shirt.red(this.props.color.r);
    this.shirt.green(this.props.color.g);
  }

  componentDidMount() {
    this.getImage();
  }

  //Sets TShirt to the stage
  getImage() {
    const image = new window.Image();
    image.src = tshirt;
    image.onload = () => {
      this.setState({
        image: image
      });
    };
  }

  //Filters is used to change the color of the image
  render() {
    return (
      <Image
        filters={[Konva.Filters.RGB]}
        image={this.state.image}
        x={0}
        y={0}
        width={500}
        height={500}
        ref={node => {
          this.shirt = node;
        }}
      />
    );
  }
}

export default TShirt;
