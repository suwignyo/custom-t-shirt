import React, { Component } from "react";
import "./App.css";
import { Stage, Layer } from "react-konva";
import { render } from "react-dom";
import TShirt from "./components/Clothes/T-Shirt";
import ColorPicker from "./components/Options/ColorPicker";
import Price from "./components/Options/Price";
import TextAddOn from "./components/Options/Text";
import Logo from "./components/Options/Logo";
import TextLayer from "./components/Layer/TextLayer";
import LogoLayer from "./components/Layer/LogoLayer";
import request from "superagent";
import Sweater from "./components/Clothes/Sweater";
import Clothes from "./components/Options/Clothes";
import Material from "./components/Options/Material";
import TransformerComponent from "./components/Util/TransformerComponent";

const CLOUDINARY_UPLOAD_PRESET = "kadsb2kb";
const CLOUDINARY_UPLOAD_URL =
  "https://api.cloudinary.com/v1_1/dae8cyrwc/image/upload";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      material: "light",
      color: { r: 255, g: 255, b: 255 },
      textOn: false,
      text: "",
      textColor: "#000000",
      textScale: [],
      logoOn: false,
      logo: {
        uploadedFileCloudinaryUrl: "",
        uploadedFile: null
      },
      clothing: "tshirt",
      price: 0,
      selectedShapeName: "",
      logoScale: []
    };
    this.onImageDrop = this.onImageDrop.bind(this);
  }

  //Handle clothing color change
  changeColor = color => {
    this.setState({
      color: color.rgb
    });
  };

  changeTextColor = color => {
    this.setState({
      textColor: color.hex
    });
  };

  //Handle text change as user input
  handleTextChange = event => {
    this.setState({
      text: event.target.value
    });
  };

  //Check if adding text is on or off, when user turns it off
  //color goes back to default and so user doesn't see the $3 charge
  handleTextChecked = name => event => {
    if (this.state.textOn) {
      this.setState({ [name]: event.target.checked, textColor: "#000000" });
    } else {
      this.setState({ [name]: event.target.checked });
    }
  };

  //Returns the type of clothing that user chooses
  clothing = clothes => {
    if (clothes === "tshirt") {
      return <TShirt color={this.state.color} />;
    } else if (clothes === "sweater") {
      return <Sweater color={this.state.color} />;
    }
  };

  //Returns the text layer if true
  textLayer = () => {
    if (this.state.textOn) {
      return (
        <TextLayer
          text={this.state.text}
          textColor={this.state.textColor}
          onTransform={newProps => {
            this.handleTextTransform(newProps);
          }}
        />
      );
    }
  };

  //Returns the logo layer if true
  logoLayer = () => {
    if (this.state.logoOn) {
      return (
        <LogoLayer
          uploadedFileCloudinaryUrl={this.state.logo.uploadedFileCloudinaryUrl}
          onTransform={newProps => {
            this.handleLogoTransform(newProps);
          }}
          logoName={this.state.logoName}
        />
      );
    }
  };

  //Remove logo handler
  removeLogo = () => {
    this.setState({
      logoOn: false
    });
  };

  //Image handler when user adds a picture
  onImageDrop(files) {
    this.setState({
      logo: { uploadedFile: files[0] },
      logoOn: true
    });

    this.handleImageUpload(files[0]);
  }

  //Sends a post request of the image to CLOUDINARY as well as getting
  //its image URL, then it is rendered in the logo layer
  handleImageUpload(file) {
    let upload = request
      .post(CLOUDINARY_UPLOAD_URL)
      .field("upload_preset", CLOUDINARY_UPLOAD_PRESET)
      .field("file", file);

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }

      if (response.body.secure_url !== "") {
        this.setState({
          logo: { uploadedFileCloudinaryUrl: response.body.secure_url }
        });
      }
    });
  }

  //Handles change of clothing type and sets color to default
  changeClothing = event => {
    if (event.currentTarget.value !== this.state.clothing) {
      this.setState({
        clothing: event.currentTarget.value,
        color: { r: 255, g: 255, b: 255 }
      });
    }
  };

  //Handles change of material, only for tshirt
  changeMaterial = event => {
    this.setState({
      material: event.currentTarget.value
    });
  };

  //When user clicks on logo or text, it will show the transformer
  handleStageMouseDown = e => {
    if (e.target === e.target.getStage()) {
      this.setState({
        selectedShapeName: ""
      });
      return;
    }
    const clickedOnTransformer =
      e.target.getParent().className === "Transformer";
    if (clickedOnTransformer) {
      return;
    }

    const name = e.target.name();
    if (name) {
      this.setState({
        selectedShapeName: name
      });
    } else {
      this.setState({
        selectedShapeName: ""
      });
    }
  };

  //The logo object gets transformed as user scale
  handleLogoTransform = (index, newProps) => {
    const logo = this.state.logoScale.concat();
    logo[index] = {
      ...logo[index],
      ...newProps
    };
    this.setState({
      logoScale: logo
    });
  };

  //The text object gets transformed as user scale
  handleTextTransform = (index, newProps) => {
    const text = this.state.textScale.concat();
    console.log(this.state.textScale[index]);
    text[index] = {
      ...text[index],
      ...newProps
    };
    this.setState({
      textScale: text
    });
  };

  render() {
    return (
      <div className="container">
        <div className="clothes">
          <Stage
            width={500}
            height={500}
            onMouseDown={this.handleStageMouseDown}
          >
            <Layer>{this.clothing(this.state.clothing)}</Layer>
            <Layer>
              {this.textLayer()}
              <TransformerComponent
                selectedShapeName={this.state.selectedShapeName}
              />
            </Layer>
            <Layer>
              {this.logoLayer()}
              <TransformerComponent
                selectedShapeName={this.state.selectedShapeName}
              />
            </Layer>
          </Stage>
        </div>
        <div className="options">
          <Clothes changeClothing={this.changeClothing} />
          <Price state={this.state} />
          <ColorPicker
            changeColor={this.changeColor}
            clothing={this.state.clothing}
          />
          <TextAddOn
            textOn={this.state.textOn}
            handleTextChecked={this.handleTextChecked}
            handleTextChange={this.handleTextChange}
            changeTextColor={this.changeTextColor}
          />
          <Logo
            logoOn={this.state.logoOn}
            onImageDrop={this.onImageDrop}
            removeLogo={this.removeLogo}
          />
          {this.state.clothing === "tshirt" ? (
            <Material
              material={this.state.material}
              changeMaterial={this.changeMaterial}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

export default App;
