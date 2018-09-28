import React, { Component } from "react";
import { Button } from "@material-ui/core";

class Material extends Component {
  render() {
    return (
      <div>
        <Button onClick={this.props.changeMaterial} value="light">
          Light Cotton
        </Button>
        <Button onClick={this.props.changeMaterial} value="heavy">
          Heavy Cotton
        </Button>
      </div>
    );
  }
}

export default Material;
