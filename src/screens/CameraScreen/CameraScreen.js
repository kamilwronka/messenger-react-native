"use strict";
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  BackHandler
} from "react-native";
import { RNCamera } from "react-native-camera";

export default class BadInstagramCloneApp extends Component {
  state = {
    photo: null
  };

  static navigationOptions = {
    header: null
  };

  _didFocusSubscription;
  _willBlurSubscription;

  constructor(props) {
    super(props);
    this._didFocusSubscription = props.navigation.addListener(
      "didFocus",
      payload =>
        BackHandler.addEventListener("hardwareBackPress", this.removeTakenPhoto)
    );
  }

  componentWillUnmount() {
    this._didFocusSubscription && this._didFocusSubscription.remove();
    this._willBlurSubscription && this._willBlurSubscription.remove();
  }

  async componentDidMount() {
    this._willBlurSubscription = this.props.navigation.addListener(
      "willBlur",
      payload =>
        BackHandler.removeEventListener(
          "hardwareBackPress",
          this.removeTakenPhoto
        )
    );
  }

  sendPhoto = () => {
    this.props.navigation.navigate({
      routeName: "ConversationScreen",
      params: { ...this.props.navigation.state.params, photo: this.state.photo }
    });
  };

  removeTakenPhoto = () => {
    if (this.state.photo) {
      this.setState({ photo: null });
      return true;
    } else {
      return false;
    }
  };

  render() {
    if (this.state.photo) {
      return (
        <View style={{ flex: 1 }}>
          <ImageBackground
            style={{ flex: 1 }}
            source={{ uri: this.state.photo.uri }}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: "transparent",
                flexDirection: "row"
              }}
            >
              <TouchableOpacity
                onPress={this.sendPhoto}
                style={{
                  flex: 1,
                  alignSelf: "flex-end",
                  alignItems: "center",
                  marginBottom: 50
                }}
              >
                <View
                  style={{
                    height: 64,
                    width: 64,
                    borderRadius: 32,
                    backgroundColor: "#fff",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <Text>Wyślij</Text>
                </View>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1 }}>
          <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            style={{ flex: 1, justifyContent: "flex-end" }}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.on}
            permissionDialogTitle={"Permission to use camera"}
            permissionDialogMessage={
              "We need your permission to use your camera phone"
            }
            onGoogleVisionBarcodesDetected={({ barcodes }) => {
              console.log(barcodes);
            }}
          >
            <View style={{ alignSelf: "center", bottom: 50 }}>
              <TouchableOpacity onPress={this.takePicture.bind(this)}>
                <View
                  style={{
                    alignSelf: "center",
                    // marginBottom: 50,
                    height: 64,
                    width: 64,
                    borderRadius: 32,
                    borderWidth: 4,
                    borderColor: "#ffffff",
                    backgroundColor: "transparent"
                  }}
                />
              </TouchableOpacity>
            </View>
          </RNCamera>
        </View>
      );
    }
  }

  takePicture = async function() {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      this.setState({ photo: data });
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "black"
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  capture: {
    flex: 0,
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: "center",
    margin: 20
  }
});
