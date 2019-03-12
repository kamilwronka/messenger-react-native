import React from "react";
import { TextInput, StyleSheet, View, TouchableOpacity } from "react-native";
// import { Ionicons, Feather } from '@expo/vector-icons';

const BorderedInput = props => {
  return (
    <View style={styles.container}>
      {/*<Feather style={styles.icon} name="search" size={24} color="#912F56" />*/}
      <TextInput
        underlineColorAndroid="rgba(0,0,0,0)"
        selectionColor="#912F56"
        style={styles.input}
        placeholderTextColor="#bbbbbb"
        autoFocus
        {...props}
      />
      {props.value.length > 0 && (
        <TouchableOpacity
          style={styles.iconRight}
          onPress={props.handleIconPress}
        >
          {/*<Ionicons name="md-close" size={20} color="#bbbbbb" />*/}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default BorderedInput;

const styles = StyleSheet.create({
  container: {
    borderColor: "#cccccc",
    borderWidth: 1,
    height: 48,
    flexDirection: "row",
    alignItems: "center"
  },
  input: {
    flex: 1,
    height: 48,
    paddingLeft: 24,
    color: "#912F56"
  },
  icon: {
    left: 10
  },
  iconRight: {
    right: 15
  }
});
