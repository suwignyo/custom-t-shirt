import React, { Component } from "react";
import { Image } from "react-konva";
import { render } from "react-dom";
import Konva from "konva";
import sweater from "../../img/sweater.png";

class Sweater extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null
    };
  }

  componentDidUpdate() {
    //image needs to be cached to display changes
    this.sweater.cache();
    this.sweater.blue(this.props.color.b);
    this.sweater.red(this.props.color.r);
    this.sweater.green(this.props.color.g);
  }

  componentDidMount() {
    this.getImage();
  }

  //Sets sweater to the stage
  getImage() {
    const image = new window.Image();
    image.src = sweater;
    image.onload = () => {
      this.setState({
        image: image
      });
    };
  }

  handleClick = () => {
    this.shirt.cache();
  };

  //Filters is used to change the color of the image
  render() {
    return (
      <Image
        filters={[Konva.Filters.RGB]}
        image={this.state.image}
        offsetX={-50}
        offsetY={-50}
        width={400}
        height={400}
        ref={node => {
          this.sweater = node;
        }}
      />
    );
  }
}

export default Sweater;
