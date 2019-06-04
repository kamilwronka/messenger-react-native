import React, { PureComponent } from "react";
import {
  Image,
  View,
  Dimensions,
  Animated,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { withNavigation } from "react-navigation";

const SCREEN_WIDTH = Dimensions.get("window").width;

class ConversationPhoto extends PureComponent {
  state = {
    placeholderOpacity: new Animated.Value(0.5)
  };

  handlePhotoPress = () => {
    const { item, conversationName } = this.props;

    this.props.navigation.navigate({
      routeName: "PhotoScreen",
      params: {
        photoUrl: `https://s3.eu-central-1.amazonaws.com/messenger-dev-bucket/${
          item.messageContent
        }`,
        conversationName
      }
    });
  };

  onLoad = () => {
    Animated.timing(this.state.placeholderOpacity, {
      toValue: 0,
      duration: 200
    }).start();
  };

  render() {
    const { item, id } = this.props;
    const { height, width } = item.metadata;
    const ratio = height / width;
    const desiredWidth = SCREEN_WIDTH / 2.5;
    const desiredHeight = desiredWidth * ratio;

    const additionalPlaceholderStyles = {
      opacity: this.state.placeholderOpacity
    };

    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          activeOpacity={0.5}
          style={{
            height: desiredHeight,
            width: desiredWidth,
            marginHorizontal: 20,
            marginVertical: 10,
            alignSelf: item.userId === id ? "flex-end" : "flex-start"
          }}
          onPress={this.handlePhotoPress}
        >
          <Image
            onLoad={this.onLoad}
            style={styles.image}
            source={{
              uri: `https://s3.eu-central-1.amazonaws.com/messenger-dev-bucket/${
                item.messageContent
              }`
            }}
          />
          <Animated.View
            style={[styles.imagePlaceholder, additionalPlaceholderStyles]}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

export default withNavigation(ConversationPhoto);

const styles = StyleSheet.create({
  image: {
    flex: 1,
    borderRadius: 10
  },
  imagePlaceholder: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#aaaaaa",
    borderRadius: 10
  }
});
