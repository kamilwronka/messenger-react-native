import React, { Component } from "react";
import { ScrollView } from "react-native";

import { ScreenContainer } from "@/components/ScreenContainer";
import {
  Header,
  HeaderTitle,
  HeaderIconLeft
} from "@/components/Header/HeaderNew";
import ProfileSection from "./components/ProfileSection";
import SettingsList from "./components/SettingsList";

class SettingsScreen extends Component {
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
          <HeaderTitle value="Settings" />
        </Header>
        <ScrollView>
          <ProfileSection />
          <SettingsList />
        </ScrollView>
      </ScreenContainer>
    );
  }
}

export default SettingsScreen;
