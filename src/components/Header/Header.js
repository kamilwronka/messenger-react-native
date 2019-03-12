import React, { Fragment } from "react";
import { View, StyleSheet, StatusBar } from "react-native";

const Header = props => {
  return (
    <Fragment>
      <View style={styles.header}>{props.children}</View>
    </Fragment>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    height: 84 - StatusBar.currentHeight,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  }
});
