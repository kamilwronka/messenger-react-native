import React, { Component } from "react";
import {
  View,
  Dimensions,
  ImageBackground,
  Image,
  StatusBar,
  TouchableWithoutFeedback,
  Text
} from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;

class WelcomeScreen extends Component {
  static navigationOptions = {
    header: null
  };

  onSignInPress = () => {
    this.props.navigation.navigate("LoginScreen");
  };

  onSignUpPress = () => {
    this.props.navigation.navigate("SignUpScreen");
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" />
        <ImageBackground
          style={{ flex: 1 }}
          source={require("../../assets/images/drawable-xxxhdpi/background.png")}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "rgba(4, 13, 22, 0.3)"
            }}
          >
            <Image
              style={{
                height: SCREEN_WIDTH / 1.5,
                width: SCREEN_WIDTH / 1.5,
                marginTop: 50,
                shadowOffset: { width: 10, height: 10 },
                shadowColor: "#ffffff",
                shadowOpacity: 1
              }}
              source={require("../../assets/images/drawable-xhdpi/gnojek.png")}
            />
            <View
              style={{
                alignItems: "center",
                position: "absolute",
                bottom: 0,
                width: SCREEN_WIDTH
              }}
            >
              <TouchableWithoutFeedback
                onPress={this.onSignInPress}
                style={{
                  marginBottom: 20
                }}
              >
                <View
                  style={{
                    height: 48,
                    width: SCREEN_WIDTH - 64,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 24,
                    backgroundColor: "#AD6A6C",
                    marginBottom: 20,
                    flexDirection: "row"
                  }}
                >
                  <Text style={{ color: "#ffffff" }}>SIGN IN</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPress={this.onSignUpPress}
                style={{
                  marginBottom: 40
                }}
              >
                <View
                  style={{
                    width: SCREEN_WIDTH - 64,
                    alignItems: "center",
                    justifyContent: "center",
                    height: 48,
                    borderRadius: 24,
                    backgroundColor: "#5D2E46",
                    marginBottom: 40,
                    flexDirection: "row"
                  }}
                >
                  <Text style={{ color: "#ffffff" }}>SIGN UP</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

export default WelcomeScreen;
