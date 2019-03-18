import React from "react";
import { Platform, View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import Colors from "../constants/Colors";

export default class TabBarIcon extends React.Component {
  prepareIconColor = () => {
    const { color, focused } = this.props;
    if (color) {
      return color;
    } else if (focused) {
      return Colors.tabIconSelected;
    } else {
      return Colors.tabIconDefault;
    }
  };

  render() {
    const { size, name } = this.props;

    return (
      <View style={styles.iconContainer}>
        <Icon name={name} size={size} color={this.prepareIconColor()} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  iconContainer: {
    marginTop: Platform.OS === "android" ? 0 : 6
  }
});
