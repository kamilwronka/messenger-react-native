import React from "react";
import { TextInput, StyleSheet, PixelRatio } from "react-native";

const Input = props => {
  return (
    <TextInput
      underlineColorAndroid="rgba(0,0,0,0)"
      selectionColor="#912F56"
      style={styles.input}
      {...props}
    />
  );
};

export default Input;

const styles = StyleSheet.create({
  input: {
    height: 48,
    color: "#912F56",
    paddingLeft: 15,
    marginHorizontal: 20,
    borderBottomColor: "#912F56",
    borderBottomWidth: 2
  }
});
