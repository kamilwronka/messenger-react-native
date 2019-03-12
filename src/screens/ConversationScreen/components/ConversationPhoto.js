import React, { PureComponent } from "react";
import {
  Image,
  View,
  Dimensions,
  PanResponder,
  Animated,
  TouchableOpacity
} from "react-native";
import { withNavigation } from "react-navigation";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

class ConversationPhoto extends PureComponent {
  handlePhotoPress = () => {
    const { item } = this.props;

    this.props.navigation.navigate({
      routeName: "PhotoScreen",
      params: {
        photoUrl: `https://s3.eu-central-1.amazonaws.com/messenger-dev-bucket/${
          item.messageContent
        }`
      }
    });
  };

  render() {
    const { item, id } = this.props;
    const { height, width } = item.metadata;
    const ratio = height / width;
    const desiredWidth = SCREEN_WIDTH / 2.5;
    const desiredHeight = desiredWidth * ratio;

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
            style={{
              flex: 1,
              borderRadius: 10
            }}
            source={{
              uri: `https://s3.eu-central-1.amazonaws.com/messenger-dev-bucket/${
                item.messageContent
              }`
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

export default withNavigation(ConversationPhoto);
