import React from "react";
import { View, StyleSheet } from "react-native";

const List = ({ children }) => {
  return <View style={styles.list}>{children}</View>;
};

export default List;

const styles = StyleSheet.create({
  list: {
    flex: 1,
    flexDirection: "column",
    flexGrow: 1
  }
});
