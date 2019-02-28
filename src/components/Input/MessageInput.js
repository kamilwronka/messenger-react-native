import React from "react";
import { TextInput, StyleSheet, View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Input = props => {
  const desiredColor = props.inputColor ? props.inputColor : "#912F56";
  return (
    <View style={styles.container}>
      <TextInput
        underlineColorAndroid="rgba(0,0,0,0)"
        selectionColor={desiredColor}
        style={styles.input}
        placeholderTextColor="#bbbbbb"
        {...props}
      />
      <TouchableOpacity
        style={styles.iconRight}
        onPress={props.handleIconPress}
      >
        <Icon name="emoticon-outline" size={24} color="#bbbbbb" />
      </TouchableOpacity>
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    // borderColor: '#cccccc',
    // borderWidth: 1,
    height: 36,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 10
  },
  input: {
    flex: 1,
    height: 40,
    paddingLeft: 15,
    fontSize: 16,
    color: "#000000"
  },
  icon: {
    left: 10
  },
  iconRight: {
    right: 10
  }
});
