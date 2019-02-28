import React from "react";
import { TextInput, StyleSheet } from "react-native";

export default (Input = props => {
  return (
    <TextInput
      {...props}
      underlineColorAndroid="blue"
      selectionColor="blue"
      style={styles.input}
    />
  );
});

const styles = StyleSheet.create({
  input: {
    width: "90%",
    height: 50,
    marginVertical: 5,
    paddingLeft: 10,
    fontSize: 16
  }
});
