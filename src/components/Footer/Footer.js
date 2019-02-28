import React, { Fragment } from "react";
import { View, StyleSheet } from "react-native";

const Footer = props => {
  return <View style={styles.footer}>{props.children}</View>;
};

export default Footer;

const styles = StyleSheet.create({
  footer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  }
});
