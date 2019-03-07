import React, { Component, Fragment } from "react";
import {
  ScrollView,
  View,
  Text,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Animated,
  Keyboard,
  StyleSheet,
  ImageBackground
} from "react-native";
import SplashScreen from "react-native-splash-screen";

import RegisterScreen from "./RegisterScreen";
import LoginScreen from "./LoginScreen";

import Input from "@/components/Input/Input";
import { Button } from "@/components/Buttons";
import { H1, H3 } from "@/components/Typography/Typography";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

class AuthScreen extends Component {
  state = {
    imgSize: new Animated.Value(0),
    keyboardHeight: new Animated.Value(0)
  };

  componentDidMount() {
    this.keyboardDidShowSub = Keyboard.addListener(
      "keyboardDidShow",
      this.keyboardDidShow
    );
    this.keyboardDidHideSub = Keyboard.addListener(
      "keyboardDidHide",
      this.keyboardDidHide
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowSub.remove();
    this.keyboardDidHideSub.remove();
  }

  keyboardDidShow = event => {
    Animated.parallel([
      Animated.timing(this.state.keyboardHeight, {
        duration: 200,
        toValue: event.endCoordinates.height,
        useNativeDriver: true
      }),
      Animated.timing(this.state.imgSize, {
        duration: 200,
        toValue: 1,
        useNativeDriver: true
      })
    ]).start();
  };

  keyboardDidHide = event => {
    Animated.parallel([
      Animated.timing(this.state.keyboardHeight, {
        duration: 200,
        toValue: 0,
        useNativeDriver: true
      }),
      Animated.timing(this.state.imgSize, {
        duration: 200,
        toValue: 0,
        useNativeDriver: true
      })
    ]).start();
  };

  render() {
    return (
      <ScrollView>
        <ImageBackground
          style={{
            width: SCREEN_WIDTH,
            height: SCREEN_HEIGHT
          }}
          source={require("@/assets/images/bg.jpg")}
        >
          <ScrollView
            style={{
              backgroundColor: "rgba(255,255,255,0.95)"
            }}
          >
            <KeyboardAvoidingView>
              <Animated.Image
                style={[
                  {
                    width: 200,
                    height: 200,
                    resizeMode: "contain",
                    alignSelf: "center",
                    marginTop: 40
                  }
                ]}
                source={require("@/assets/images/drawable-xxhdpi/logo.png")}
              />
              <Text style={styles.logoText}>Messenger</Text>
              <LoginScreen />
            </KeyboardAvoidingView>
          </ScrollView>
        </ImageBackground>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  logoText: {
    fontFamily: "MyriadPro",
    fontSize: 28,
    alignSelf: "center",
    color: "#912F56",
    fontWeight: "bold"
  }
});

export default AuthScreen;
