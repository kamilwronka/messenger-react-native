import React, { PureComponent } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import RNVideo from "react-native-video";

class Video extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <RNVideo
          source={{ uri: this.props.video.uri }} // Can be a URL or a local file.
          ref={ref => {
            this.player = ref;
          }}
          style={styles.backgroundVideo}
        />
        <View style={StyleSheet.absoluteFill}>
          <TouchableOpacity
            onPress={this.props.sendVideo}
            style={styles.touchable}
          >
            <View style={styles.sendButton}>
              <Text>Send</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Video;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  sendButton: {
    height: 64,
    width: 64,
    borderRadius: 32,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  touchable: {
    position: "absolute",
    bottom: 50,
    marginBottom: 50
  },
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
});
