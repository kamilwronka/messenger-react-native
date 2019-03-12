import React from "react";
import { Text, TouchableNativeFeedback, View, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const { width } = Dimensions.get("window");

export const Header = ({ children }) => {
  return (
    <View
      style={{
        marginTop: 24,
        height: 56,
        width,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      {children}
    </View>
  );
};

export const HeaderTitle = ({ value, color }) => {
  return (
    <Text
      style={{
        fontSize: 22,
        fontWeight: "bold",
        color: color ? color : "#ffffff"
      }}
    >
      {value}
    </Text>
  );
};

export const HeaderIconLeft = ({ iconName, size, color, onPress }) => {
  return (
    <View style={{ position: "absolute", left: 32 }}>
      <TouchableNativeFeedback onPress={onPress}>
        <Icon name={iconName} size={size} color={color ? color : "#ffffff"} />
      </TouchableNativeFeedback>
    </View>
  );
};

export const HeaderIconRight = ({ iconName, size, color, onPress }) => {
  return (
    <View style={{ position: "absolute", right: 32 }}>
      <TouchableNativeFeedback onPress={onPress}>
        <Icon name={iconName} size={size} color={color ? color : "#ffffff"} />
      </TouchableNativeFeedback>
    </View>
  );
};
