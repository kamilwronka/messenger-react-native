import React from "react";
import { View, StyleSheet } from "react-native";

const Card = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    height: "70%",
    width: "80%",
    padding: 30,
    margin: 30,
    backgroundColor: "#fff",
    opacity: 0.6
  }
});

export default Card;
