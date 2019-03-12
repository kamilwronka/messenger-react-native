import React, { Component } from "react";
import {
  ScrollView,
  Text,
  KeyboardAvoidingView,
  Animated,
  StyleSheet
} from "react-native";
import LoginScreen from "./LoginScreen";

import { Button } from "@/components/Buttons";
import { H1, H3 } from "@/components/Typography/Typography";

class AuthScreen extends Component {
  render() {
    return (
      <ScrollView>
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
            source={require("@/assets/images/drawable-xxxhdpi/logo.png")}
          />
          <Text style={styles.logoText}>Messenger</Text>
          <LoginScreen />
        </KeyboardAvoidingView>
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
