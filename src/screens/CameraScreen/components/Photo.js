import React, { PureComponent } from "react";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";

import {
  Header,
  HeaderTitle,
  HeaderIconRight,
  HeaderIconLeft
} from "@/components/Header/HeaderNew";

class Photo extends PureComponent {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header>
          <HeaderIconLeft
            iconName="chevron-left"
            onPress={this.goBack}
            color="#ffffff"
            size={28}
          />
        </Header>
        <ImageBackground
          style={{ flex: 1 }}
          source={{ uri: this.props.photo.uri }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "transparent",
              flexDirection: "row"
            }}
          >
            <TouchableOpacity
              onPress={this.props.sendPhoto}
              style={{
                flex: 1,
                alignSelf: "flex-end",
                alignItems: "center",
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
                <Text>Wyślij</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

export default Photo;
