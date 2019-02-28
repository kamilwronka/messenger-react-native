import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";

const ButtonComponent = props => {
  return (
    <TouchableOpacity {...props} style={styles.button}>
      {props.children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    marginTop: 20,
    paddingHorizontal: 30,
    backgroundColor: "blue"
  }
});

export default ButtonComponent;
