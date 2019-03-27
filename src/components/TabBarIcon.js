import React from "react";
import { Platform, View, StyleSheet, Text } from "react-native";
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
    const { size, name, badgeData } = this.props;

    return (
      <View style={styles.iconContainer}>
        <Icon name={name} size={size} color={this.prepareIconColor()} />
        {badgeData > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{badgeData}</Text>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  iconContainer: {
    marginTop: Platform.OS === "android" ? 0 : 6
  },
  badge: {
    position: "absolute",
    top: -2,
    right: -2,
    height: 18,
    width: 18,
    borderRadius: 9,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center"
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#ffffff"
  }
});
