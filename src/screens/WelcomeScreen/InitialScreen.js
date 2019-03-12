import React, { Component } from "react";
import { View, Text, Image } from "react-native";

import Jumbotron from "@/components/Jumbotron/Jumbotron";
import { H1 } from "@/components/Typography/Typography";

class InitialScreen extends Component {
  render() {
    return (
      <View>
        <Jumbotron>
          <Image
            style={{
              height: 200,
              width: 200,
              resizeMode: "contain",
              alignSelf: "center",
              marginTop: 30,
              marginBottom: 40
            }}
            source={require("@/assets/images/drawable-hdpi/Illustration.png")}
          />
          <H1>Excepteur sint occaecat</H1>
          <Text style={{ marginTop: 30, textAlign: "center", fontSize: 14 }}>
            Ut labore et dolore roipi mana aliqua. Enim adeop minim veeniam
            nostruklad
          </Text>
        </Jumbotron>
      </View>
    );
  }
}

export default InitialScreen;
