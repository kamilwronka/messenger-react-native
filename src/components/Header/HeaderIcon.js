import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";

const HeaderIcon = props => {
  return (
    <TouchableOpacity {...props} style={styles.icon}>
      {props.children}
    </TouchableOpacity>
  );
};

export default HeaderIcon;

const styles = StyleSheet.create({
  icon: {
    position: "absolute",
    right: 20
  }
});
