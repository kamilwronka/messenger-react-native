"use strict";
import React, { Component } from "react";
import {
  StyleSheet,
  BackHandler,
  View,
  Platform,
  StatusBar
} from "react-native";

import Camera from "./components/Camera";
import Video from "./components/Video";
import Photo from "./components/Photo";
import LinearGradient from "react-native-linear-gradient";

import {
  Header,
  HeaderTitle,
  HeaderIconRight,
  HeaderIconLeft
} from "@/components/Header/HeaderNew";

class CameraScreen extends Component {
  static navigationOptions = {
    header: null
  };

  _didFocusSubscription;
  _willBlurSubscription;

  constructor(props) {
    super(props);
    this._didFocusSubscription = props.navigation.addListener("didFocus", () =>
      BackHandler.addEventListener(
        "hardwareBackPress",
        this.removeTakenPhotoOrVideo
      )
    );
    this.state = {
      photo: null,
      video: null
    };
  }

  componentWillUnmount() {
    this._didFocusSubscription && this._didFocusSubscription.remove();
    this._willBlurSubscription && this._willBlurSubscription.remove();
  }

  async componentDidMount() {
    this._willBlurSubscription = this.props.navigation.addListener(
      "willBlur",
      () =>
        BackHandler.removeEventListener(
          "hardwareBackPress",
          this.removeTakenPhotoOrVideo
        )
    );
  }

  pushToState = data => {
    this.setState(data);
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

  removeTakenPhotoOrVideo = () => {
    if (this.state.photo || this.state.video) {
      this.setState({ photo: null, video: null });
      return true;
    } else {
      return false;
    }
  };

  renderProperView = () => {
    if (this.state.photo) {
      return <Photo sendPhoto={this.sendPhoto} photo={this.state.photo} />;
    } else if (this.state.video) {
      return <Video sendVideo={this.sendVideo} video={this.state.video} />;
    } else {
      return <Camera pushToContainerState={this.pushToState} />;
    }
  };

  render() {
    return <View style={styles.container}>{this.renderProperView()}</View>;
  }
}

export default CameraScreen;

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
