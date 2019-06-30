import React, { PureComponent } from "react";
import { TouchableWithoutFeedback, View, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";

import { ListItem, List } from "@/components/List";

import { logoutUser } from "@/actions/auth.actions";

class SettingsList extends PureComponent {
  handleLogout = async () => {
    try {
      await this.props.logoutUser();
      this.props.navigation.navigate("WelcomeScreen");
    } catch (err) {
      this.props.navigation.navigate("WelcomeScreen");
    }
  };

  render() {
    return (
      <List>
        <View
          style={{ paddingHorizontal: 32, width: "100%", marginBottom: 20 }}
        >
          <Text style={{ fontSize: 20, color: "#ffffff" }}>Preferences</Text>
        </View>
        <ListItem
          iconName="bell"
          value="Notifications and sounds"
          iconColor="#FFFFFF"
          iconBackground="#41337A"
        />
        <ListItem
          iconName="image"
          value="Photos"
          iconColor="#FFFFFF"
          iconBackground="#456990"
        />
        <ListItem
          iconName="signal"
          value="Data saving"
          iconColor="#FFFFFF"
          iconBackground="#003B36"
        />
        <View
          style={{
            paddingHorizontal: 32,
            width: "100%",
            marginBottom: 20,
            marginTop: 20
          }}
        >
          <Text style={{ fontSize: 20, color: "#ffffff" }}>Account</Text>
        </View>
        <ListItem
          iconName="help"
          value="Help and support"
          iconColor="#FFFFFF"
          iconBackground="#456990"
        />
        <ListItem
          iconName="logout"
          value="Log out"
          iconColor="#FFFFFF"
          iconBackground="#AD6A6C"
          onPress={this.handleLogout}
        />
      </List>
    );
  }
}

const mapDispatchToProps = {
  logoutUser
};

export default connect(
  null,
  mapDispatchToProps
)(withNavigation(SettingsList));
