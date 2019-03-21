import React, { PureComponent } from "react";
import {
  View,
  TouchableWithoutFeedback,
  Animated,
  Dimensions,
  UIManager,
  Modal
} from "react-native";
import Video from "react-native-video";

const { width, height } = Dimensions.get("window");

class ConversationVideo extends PureComponent {
  state = {
    modalOpened: false
  };

  onBuffer = () => {
    console.log("buffering");
  };

  onError = e => {
    console.log(e);
  };

  playVideo = () => {
    this.player.presentFullscreenPlayer();
    this.setState({ modalOpened: true });
  };

  hideVideoModal = () => {
    this.setState({ modalOpened: false });
  };

  render() {
    return (
      <View>
        <TouchableWithoutFeedback onPress={this.playVideo}>
          <View
            style={{
              width: 196,
              height: 350,
              marginVertical: 10,
              borderRadius: 5
            }}
          >
            <Video
              source={{
                uri: `https://s3.eu-central-1.amazonaws.com/messenger-dev-bucket/${
                  this.props.video.messageContent
                }`
              }} // Can be a URL or a local file.
              ref={ref => {
                this.player = ref;
              }} // Store reference
              onBuffer={this.onBuffer} // Callback when remote video is buffering
              onError={this.videoError}
              resizeMode="contain"
              paused={true} // Callback when video cannot be loaded
              style={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: "absolute",
                borderRadius: 10,
                zIndex: -1
              }}
            />
          </View>
        </TouchableWithoutFeedback>
        <Modal
          visible={this.state.modalOpened}
          hardwareAccelerated
          animationType="fade"
          presentationStyle="fullScreen"
          onRequestClose={this.hideVideoModal}
        >
          <Video
            source={{
              uri: `https://s3.eu-central-1.amazonaws.com/messenger-dev-bucket/${
                this.props.video.messageContent
              }`
            }} // Can be a URL or a local file.
            ref={ref => {
              this.playerFullscreen = ref;
            }} // Store reference
            controls
            fullscreen
            paused={false}
            resizeMode="contain"
            onBuffer={this.onBuffer} // Callback when remote video is buffering
            onError={this.videoError} // Callback when video cannot be loaded
            style={{
              backgroundColor: "#000000",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: "absolute"
            }}
          />
        </Modal>
      </View>
    );
  }
}

export default ConversationVideo;
