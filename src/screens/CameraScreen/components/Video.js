import React, { PureComponent } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import RNVideo from "react-native-video";

class Video extends PureComponent {
  render() {
    return (
      <View style={{ flex: 1 }}>
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
              <Text>Send</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Video;
