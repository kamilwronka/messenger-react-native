import React, { PureComponent } from "react";
import {
  ImageBackground,
  View,
  Button,
  TouchableWithoutFeedback
} from "react-native";

class CameraRollImage extends PureComponent {
  state = {
    selected: false
  };

  toggleSelect = () => {
    this.setState({ selected: !this.state.selected });
  };

  render() {
    const { width, uri, height } = this.props;
    const imgRatio = width / height;
    const fixedHeight = 200;
    const calculatedWidth = fixedHeight * imgRatio;

    return (
      <View style={{ borderRightWidth: 2, borderColor: "#fff" }}>
        <TouchableWithoutFeedback onPress={this.toggleSelect}>
          <ImageBackground
            style={{
              width: calculatedWidth,
              height: fixedHeight
            }}
            source={{ uri }}
          >
            {this.state.selected && (
              <View style={{ flex: 1 }}>
                <Button title="Wyślij" />
              </View>
            )}
          </ImageBackground>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

export default CameraRollImage;
