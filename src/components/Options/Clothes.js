import React, { Component } from "react";
import { Button } from "@material-ui/core";

class Clothes extends Component {
  render() {
    return (
      <div className="clothes-type">
        <Button onClick={this.props.changeClothing} value="tshirt">
          T-Shirt
        </Button>
        <Button onClick={this.props.changeClothing} value="sweater">
          Sweater
        </Button>
      </div>
    );
  }
}

export default Clothes;
