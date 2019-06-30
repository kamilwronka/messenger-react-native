import React from "react";
import {
  TouchableWithoutFeedback,
  View,
  Text,
  StyleSheet,
  Platform
} from "react-native";
import { string } from "prop-types";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const ListItem = ({
  iconName,
  iconBackground,
  iconColor,
  value,
  onPress,
  iconSize,
  children
}) => {
  const iconCustomStyle = {
    backgroundColor: iconBackground
  };

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <View style={[styles.icon, iconCustomStyle]}>
            {iconName && (
              <Icon name={iconName} size={iconSize} color={iconColor} />
            )}
          </View>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{value}</Text>
        </View>
        <View style={styles.additionalComponent}>{children}</View>
      </View>
    </TouchableWithoutFeedback>
  );
};

ListItem.propTypes = {
  iconBackground: string,
  iconColor: string,
  iconName: string,
  value: string.isRequired
};

ListItem.defaultProps = {
  iconBackground: "#ccc",
  iconColor: "#fff",
  iconSize: 28
};

const styles = StyleSheet.create({
  container: {
    height: 72,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingHorizontal: 32,
    flexDirection: "row"
  },
  iconContainer: {
    height: 72,
    alignItems: "center",
    justifyContent: "center"
  },
  icon: {
    height: 48,
    width: 48,
    borderRadius: 24,
    paddingTop: Platform.OS === "ios" ? 6 : 0,
    alignItems: "center",
    justifyContent: "center"
  },
  textContainer: {
    height: 72,
    marginLeft: 16,
    alignItems: "center",
    justifyContent: "center"
  },
  text: { color: "#ffffff", fontSize: 18 },
  additionalComponent: {
    position: "absolute",
    height: 72,
    marginLeft: 16,
    alignItems: "center",
    justifyContent: "center",
    right: 32
  }
});

export default ListItem;
