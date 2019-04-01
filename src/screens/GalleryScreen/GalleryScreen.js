import React, { Component } from "react";
import { ScrollView, Text } from "react-native";

import { ScreenContainer } from "@/components/ScreenContainer";
import {
  Header,
  HeaderTitle,
  HeaderIconLeft
} from "@/components/Header/HeaderNew";

class GalleryScreen extends Component {
  static navigationOptions = {
    header: null
  };

  goBack = () => {
    this.props.navigation.goBack();
  };

  render() {
    return (
      <ScreenContainer>
        <Header>
          <HeaderIconLeft
            iconName="chevron-left"
            onPress={this.goBack}
            color="#ffffff"
            size={28}
          />
          <HeaderTitle value="Gallery" />
        </Header>
        <ScrollView>
          <Text>Dupa</Text>
        </ScrollView>
      </ScreenContainer>
    );
  }
}

export default GalleryScreen;
