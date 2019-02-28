import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";

const HeaderLeftIcon = props => {
  return (
    <TouchableOpacity {...props} style={styles.icon}>
      {props.children}
    </TouchableOpacity>
  );
};

export default HeaderLeftIcon;

const styles = StyleSheet.create({
  icon: {
    position: "absolute",
    left: 20
  }
});
