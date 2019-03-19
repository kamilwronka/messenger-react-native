import React from "react";
import {
  View,
  Animated,
  StyleSheet,
  StatusBar,
  Platform,
  Dimensions,
  ActionSheetIOS
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import ImageViewer from "react-native-image-zoom-viewer";

import {
  Header,
  HeaderTitle,
  HeaderIconRight,
  HeaderIconLeft
} from "@/components/Header/HeaderNew";

const { width, height } = Dimensions.get("window");

export default class ConversationPhotoScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    headerShow: true,
    headerPosition: new Animated.Value(0),
    scaled: false
  };

  async componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {
    if (!this.state.scaled && prevState.headerShow !== this.state.headerShow) {
      if (this.state.headerShow) {
        Animated.timing(this.state.headerPosition, {
          duration: 100,
          toValue: 0
        }).start();
      } else {
        Animated.timing(this.state.headerPosition, {
          duration: 100,
          toValue: -84
        }).start();
      }
    }
  }

  goBack = () => {
    this.props.navigation.goBack();
  };

  onPhotoPress = () => {
    this.setState({ headerShow: !this.state.headerShow });
  };

  handleLongPress = () => {
    Platform.OS !== "android"
      ? ActionSheetIOS.showActionSheetWithOptions(
          {
            options: ["Cancel", "Save to device"],
            destructiveButtonIndex: 1,
            cancelButtonIndex: 0
          },
          buttonIndex => {
            if (buttonIndex === 1) {
              /* destructive action */
              alert("Image saved");
            }
          }
        )
      : alert("Options menu");
  };

  render() {
    const { photoUrl, conversationName } = this.props.navigation.state.params;
    const headerStyles = { top: this.state.headerPosition };
    const linearGradientColors = ["rgba(0,0,0,0.4)", "rgba(0,0,0,0)"];

    const images = [
      {
        width,
        height,
        props: {
          source: { uri: photoUrl },
          style: { resizeMode: "contain" }
        }
      }
    ];

    return (
      <View style={{ flex: 1, backgroundColor: "#000000" }}>
        <StatusBar hidden={true} />
        <Animated.View style={[headerStyles, styles.headerContainer]}>
          <LinearGradient colors={linearGradientColors} style={styles.gradient}>
            <Header>
              <HeaderIconLeft
                iconName="chevron-left"
                onPress={this.goBack}
                color="#ffffff"
                size={28}
              />
              <HeaderTitle value={conversationName} color="#ffffff" />
            </Header>
          </LinearGradient>
        </Animated.View>
        <View style={{ flex: 1 }}>
          <ImageViewer
            imageUrls={images}
            renderIndicator={() => <View />}
            onClick={this.onPhotoPress}
            minScale={1}
            maxScale={3}
            onLongPress={this.handleLongPress}
            saveToLocalByLongPress={false}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  photo: {
    width: 500,
    height: 500,
    resizeMode: "contain"
  },
  gradient: {
    position: "absolute",
    top: Platform.OS === "android" ? -StatusBar.currentHeight : 0
  },
  headerContainer: {
    zIndex: 5
  }
});
