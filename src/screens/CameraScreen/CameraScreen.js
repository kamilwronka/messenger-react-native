"use strict";
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  BackHandler,
  PanResponder
} from "react-native";
import { RNCamera } from "react-native-camera";
import Video from "react-native-video";

const TOUCH_DURATION_FOR_VIDEO_RECORDING = 1000;

export default class BadInstagramCloneApp extends Component {
  state = {
    photo: null,
    video: null
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
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        console.log("grant");
        this.touchStart = Date.now();
        this.longPressTimeout = setTimeout(() => {
          console.log("long press");
          this.videoRecording = true;
          this.recordVideo();
        }, 2000);
      },
      onPanResponderMove: (evt, gestureState) => {},
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        this.touchEnd = Date.now();
        clearTimeout(this.longPressTimeout);

        if (this.touchEnd - this.touchStart < 2000) {
          this.takePicture();
        }

        if (this.touchEnd - this.touchStart >= 2000 && this.videoRecording) {
          this.camera.stopRecording();
        }
      },
      onPanResponderTerminate: (evt, gestureState) => {},
      onShouldBlockNativeResponder: (evt, gestureState) => {
        return true;
      }
    });
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

  takePicture = async () => {
    console.log("photo taken");
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      this.setState({ photo: data });
    }
  };

  recordVideo = async () => {
    if (this.camera) {
      const options = {
        quality: RNCamera.Constants.VideoQuality["720p"],
        orientation: "portrait"
      };
      this.camera.recordAsync(options).then(data => {
        this.setState({ video: data });
        console.log(data);
      });
    }
  };

  sendPhoto = () => {
    this.props.navigation.navigate({
      routeName: "ConversationScreen",
      params: { ...this.props.navigation.state.params, photo: this.state.photo }
    });
  };

  sendVideo = () => {
    this.props.navigation.navigate({
      routeName: "ConversationScreen",
      params: { ...this.props.navigation.state.params, video: this.state.video }
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
    } else if (this.state.video) {
      return (
        <View style={{ flex: 1 }}>
          <Video
            source={{ uri: this.state.video.uri }} // Can be a URL or a local file.
            ref={ref => {
              this.player = ref;
            }} // Store reference
            onBuffer={this.onBuffer} // Callback when remote video is buffering
            onError={this.videoError} // Callback when video cannot be loaded
            style={styles.backgroundVideo}
          />
          <View style={StyleSheet.absoluteFill}>
            <TouchableOpacity
              onPress={this.sendVideo}
              style={{
                position: "absolute",
                bottom: 50,
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
            pauseAfterCapture
          >
            <View style={{ alignSelf: "center", bottom: 50 }}>
              <View
                {...this._panResponder.panHandlers}
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
            </View>
          </RNCamera>
        </View>
      );
    }
  }
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
  },
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
});
