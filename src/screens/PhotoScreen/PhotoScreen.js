import React from "react";
import {
  View,
  Image,
  Animated,
  Dimensions,
  StatusBar,
  TouchableWithoutFeedback
} from "react-native";
import LinearGradient from "react-native-linear-gradient";

import {
  Header,
  HeaderTitle,
  HeaderIconRight,
  HeaderIconLeft
} from "@/components/Header/HeaderNew";

const SCREEN_WIDTH = Dimensions.get("window").width;

export default class ConversationPhotoScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    headerShow: true,
    headerPosition: new Animated.Value(0)
  };

  async componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {
    if (prevState.headerShow !== this.state.headerShow) {
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

  render() {
    const headerStyles = this.state.headerPosition;

    return (
      <View style={{ flex: 1, backgroundColor: "#000000" }}>
        <StatusBar hidden={true} />
        <Animated.View style={{ top: headerStyles }}>
          <LinearGradient
            colors={["rgba(0,0,0,0.4)", "rgba(0,0,0,0)"]}
            style={{
              position: "absolute",
              zIndex: 2,
              top: -StatusBar.currentHeight
            }}
          >
            <Header>
              <HeaderIconLeft
                iconName="chevron-left"
                onPress={this.goBack}
                color="#ffffff"
                size={28}
              />
              <HeaderTitle value="nazwa konwersacji" color="#ffffff" />
              {/* <HeaderIconRight
              iconName="dots-vertical"
              size={28}
              color="#ffffff"
              onPress={this.navigateToConversationInfo}
            /> */}
            </Header>
          </LinearGradient>
        </Animated.View>
        <TouchableWithoutFeedback onPress={this.onPhotoPress}>
          <Image
            resizeMode="contain"
            style={{
              flex: 1,
              height: null,
              width: null,
              resizeMode: "contain"
            }}
            source={{ uri: this.props.navigation.state.params.photoUrl }}
          />
        </TouchableWithoutFeedback>
      </View>
    );
  }
}
